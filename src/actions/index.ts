import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { RESEND_API_KEY, ORDER_EMAIL, TURNSTILE_SECRET_KEY, ADMIN_PASSWORD } from 'astro:env/server';
import { Resend } from 'resend';

const COOKIE_NAME = 'admin_session';

async function hashToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + ':myci-admin-salt');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const server = {
  sendOrder: defineAction({
    accept: 'json',
    input: z.object({
      services: z.array(z.string()).min(1, 'Vyberte alespoň jednu službu.'),
      companyName: z.string().min(1, 'Název společnosti je povinný.'),
      email: z.string().email('Neplatný e-mail.'),
      phone: z.string().min(1, 'Telefon je povinný.'),
      street: z.string().min(1, 'Ulice je povinná.'),
      city: z.string().min(1, 'Město je povinné.'),
      zip: z.string().min(1, 'PSČ je povinné.'),
      serviceDate: z.string().optional(),
      notes: z.string().optional(),
      honeypot: z.string().optional(),
      turnstileToken: z.string().min(1, 'Ověření nebylo dokončeno.'),
    }),
    handler: async (input, context) => {
      // Honeypot check
      if (input.honeypot) {
        return { success: true };
      }

      // Verify Turnstile token
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: input.turnstileToken,
        }),
      });
      const turnstileResult = await turnstileResponse.json() as { success: boolean };
      if (!turnstileResult.success) {
        throw new ActionError({
          code: 'FORBIDDEN',
          message: 'Ověření Turnstile selhalo.',
        });
      }

      const resend = new Resend(RESEND_API_KEY);

      const htmlBody = `
        <h2>Nová objednávka z webu Myči.CZ</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Služby</td>
              <td style="padding:8px;border:1px solid #ddd;">${input.services.map(escapeHtml).join(', ')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Společnost/Kontakt</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.companyName)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-mail</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.phone)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Adresa</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.street)}, ${escapeHtml(input.city)} ${escapeHtml(input.zip)}</td></tr>
          ${input.serviceDate ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Datum</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.serviceDate)}</td></tr>` : ''}
          ${input.notes ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Poznámky</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.notes)}</td></tr>` : ''}
        </table>
      `;

      const { error } = await resend.batch.send([
        {
          from: 'Levnemytivyloh.CZ Web <formular@levnemytivyloh.cz>',
          to: [ORDER_EMAIL],
          replyTo: input.email,
          subject: `Objednávka: ${input.services.join(', ')} - ${input.companyName}`,
          html: htmlBody,
        },
        {
          from: 'Levnemytivyloh.CZ <formular@levnemytivyloh.cz>',
          to: [input.email],
          subject: 'Potvrzení objednávky - Myči.CZ',
          html: `
            <h2>Děkujeme za Vaši objednávku!</h2>
            <p>Dobrý den,</p>
            <p>potvrzujeme přijetí Vaší objednávky. Zde je shrnutí:</p>
            ${htmlBody}
            <p>Budeme Vás co nejdříve kontaktovat.</p>
            <p>S pozdravem,<br>Tým Myči.CZ</p>
          `,
        },
      ]);

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }

      // Save to D1 database
      const db = context.locals.runtime.env.DB;
      await db.prepare(
        `INSERT INTO orders (services, company_name, email, phone, street, city, zip, service_date, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        input.services.join(', '),
        input.companyName,
        input.email,
        input.phone,
        input.street,
        input.city,
        input.zip,
        input.serviceDate || null,
        input.notes || null,
      ).run();

      return { success: true };
    },
  }),

  sendContact: defineAction({
    accept: 'json',
    input: z.object({
      name: z.string().min(1, 'Jméno je povinné.'),
      email: z.string().email('Neplatný e-mail.'),
      phone: z.string().optional(),
      message: z.string().min(1, 'Zpráva je povinná.'),
      honeypot: z.string().optional(),
      turnstileToken: z.string().min(1, 'Ověření nebylo dokončeno.'),
    }),
    handler: async (input, context) => {
      if (input.honeypot) {
        return { success: true };
      }

      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: input.turnstileToken,
        }),
      });
      const turnstileResult = await turnstileResponse.json() as { success: boolean };
      if (!turnstileResult.success) {
        throw new ActionError({
          code: 'FORBIDDEN',
          message: 'Ověření Turnstile selhalo.',
        });
      }

      const resend = new Resend(RESEND_API_KEY);

      const htmlBody = `
        <h2>Kontaktní formulář – Levnemytivyloh.CZ</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Jméno</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">E-mail</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.email)}</td></tr>
          ${input.phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Telefon</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.phone)}</td></tr>` : ''}
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Zpráva</td>
              <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(input.message)}</td></tr>
        </table>
      `;

      const { error } = await resend.batch.send([
        {
          from: 'Levnemytivyloh.CZ Web <formular@levnemytivyloh.cz>',
          to: [ORDER_EMAIL],
          replyTo: input.email,
          subject: `Kontaktní formulář: ${input.name}`,
          html: htmlBody,
        },
        {
          from: 'Levnemytivyloh.CZ <formular@levnemytivyloh.cz>',
          to: [input.email],
          subject: 'Potvrzení zprávy - Levnemytivyloh.CZ',
          html: `
            <h2>Děkujeme za Vaši zprávu!</h2>
            <p>Dobrý den,</p>
            <p>potvrzujeme přijetí Vaší zprávy. Zde je shrnutí:</p>
            ${htmlBody}
            <p>Budeme Vás co nejdříve kontaktovat.</p>
            <p>S pozdravem,<br>Tým Levnemytivyloh.CZ</p>
          `,
        },
      ]);

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        });
      }

      // Save to D1 database
      const db = context.locals.runtime.env.DB;
      await db.prepare(
        `INSERT INTO contacts (name, email, phone, message)
         VALUES (?, ?, ?, ?)`
      ).bind(
        input.name,
        input.email,
        input.phone || null,
        input.message,
      ).run();

      return { success: true };
    },
  }),

  adminLogin: defineAction({
    accept: 'form',
    input: z.object({
      password: z.string(),
      'cf-turnstile-response': z.string().min(1, 'Ověření nebylo dokončeno.'),
    }),
    handler: async (input, context) => {
      const tsRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: input['cf-turnstile-response'] }),
      });
      const tsResult = await tsRes.json() as { success: boolean };
      if (!tsResult.success) {
        throw new ActionError({ code: 'FORBIDDEN', message: 'Ověření selhalo. Zkuste to znovu.' });
      }

      if (input.password !== ADMIN_PASSWORD) {
        throw new ActionError({ code: 'FORBIDDEN', message: 'Nesprávné heslo.' });
      }

      const token = await hashToken(input.password);
      context.cookies.set(COOKIE_NAME, token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return { success: true };
    },
  }),

  adminLogout: defineAction({
    accept: 'form',
    handler: async (_input, context) => {
      context.cookies.delete(COOKIE_NAME, { path: '/' });
      return { success: true };
    },
  }),

  adminDeleteOrder: defineAction({
    accept: 'form',
    input: z.object({
      orderId: z.coerce.number(),
    }),
    handler: async (input, context) => {
      const expectedToken = await hashToken(ADMIN_PASSWORD);
      const session = context.cookies.get(COOKIE_NAME)?.value;
      if (session !== expectedToken) {
        throw new ActionError({ code: 'UNAUTHORIZED', message: 'Nepřihlášen.' });
      }

      const db = context.locals.runtime.env.DB;
      await db.prepare('DELETE FROM orders WHERE id = ?').bind(input.orderId).run();
      return { success: true };
    },
  }),
};
