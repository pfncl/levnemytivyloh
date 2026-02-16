<script lang="ts">
  import { t, type Locale } from '../i18n/translations';

  interface Props {
    lang?: Locale;
  }

  let { lang = 'cs' }: Props = $props();
  const i18n = $derived(t(lang));

  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let message = $state('');

  let honeypot = $state('');
  let turnstileToken = $state('');

  let submitting = $state(false);
  let submitResult = $state<'idle' | 'success' | 'error'>('idle');
  let errors = $state<Record<string, string>>({});

  let turnstileEl: HTMLDivElement | undefined = $state();
  let turnstileWidgetId: string | undefined;
  let turnstileLoaded = false;

  function loadTurnstile() {
    if (turnstileLoaded) return;
    turnstileLoaded = true;

    function renderWidget() {
      if (!turnstileEl || turnstileWidgetId !== undefined) return;
      turnstileWidgetId = (window as any).turnstile.render(turnstileEl, {
        sitekey: '0x4AAAAAACb2orZs8ymvai7p',
        theme: 'light',
        callback: (token: string) => { turnstileToken = token; },
        'expired-callback': () => { turnstileToken = ''; },
        'error-callback': () => { turnstileToken = ''; },
        language: lang,
      });
    }

    if ((window as any).turnstile) {
      renderWidget();
    } else if (!document.querySelector('script[src*="turnstile"]')) {
      (window as any).onTurnstileLoad = renderWidget;
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
      script.async = true;
      document.head.appendChild(script);
    } else {
      (window as any).onTurnstileLoad = renderWidget;
    }
  }

  $effect(() => {
    return () => {
      if (turnstileWidgetId !== undefined && (window as any).turnstile) {
        (window as any).turnstile.remove(turnstileWidgetId);
        turnstileWidgetId = undefined;
      }
    };
  });

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = i18n.formRequired;
    if (!email.trim()) newErrors.email = i18n.formRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = i18n.formInvalidEmail;
    if (!message.trim()) newErrors.message = i18n.formRequired;
    if (!turnstileToken) newErrors.turnstile = i18n.formTurnstileError;
    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!validate()) return;

    submitting = true;
    submitResult = 'idle';

    try {
      const { actions } = await import('astro:actions');
      const { error } = await actions.sendContact({
        name,
        email,
        phone,
        message,
        honeypot,
        turnstileToken,
      });

      submitResult = error ? 'error' : 'success';
    } catch {
      submitResult = 'error';
    } finally {
      submitting = false;
    }
  }
</script>

{#if submitResult === 'success'}
  <div class="form-success">
    <h3>{i18n.contactFormSuccessTitle}</h3>
    <p>{i18n.contactFormSuccessText}</p>
  </div>
{:else}
  <form onsubmit={handleSubmit} onfocusin={loadTurnstile} novalidate>
    <h3 class="form-title">{i18n.contactFormTitle}</h3>

    <div class="field">
      <label class="field-label" for="contact-name">
        {i18n.contactFormName} <span class="required">*</span>
      </label>
      <input type="text" id="contact-name" bind:value={name}>
      {#if errors.name}<p class="field-error">{errors.name}</p>{/if}
    </div>

    <div class="form-row">
      <div class="field half">
        <label class="field-label" for="contact-email">{i18n.contactFormEmail} <span class="required">*</span></label>
        <input type="email" id="contact-email" bind:value={email}>
        {#if errors.email}<p class="field-error">{errors.email}</p>{/if}
      </div>
      <div class="field half">
        <label class="field-label" for="contact-phone">{i18n.contactFormPhone}</label>
        <input type="tel" id="contact-phone" bind:value={phone}>
      </div>
    </div>

    <div class="field">
      <label class="field-label" for="contact-message">
        {i18n.contactFormMessage} <span class="required">*</span>
      </label>
      <textarea id="contact-message" bind:value={message} rows="5"></textarea>
      {#if errors.message}<p class="field-error">{errors.message}</p>{/if}
    </div>

    <p class="consent-note">
      {i18n.formConsentText} <a href={i18n.privacyPolicyUrl} target="_blank">{i18n.formConsentLink}</a>. {i18n.formConsentCompany}
    </p>

    <div class="field turnstile-field">
      <div bind:this={turnstileEl}></div>
      {#if errors.turnstile}<p class="field-error">{errors.turnstile}</p>{/if}
    </div>

    <!-- Honeypot -->
    <div class="honeypot" aria-hidden="true" tabindex="-1">
      <label>Email <input type="text" bind:value={honeypot} autocomplete="off" tabindex="-1"></label>
    </div>

    <button type="submit" class="btn-submit" disabled={submitting}>
      {submitting ? i18n.contactFormSubmitting : i18n.contactFormSubmit}
    </button>

    {#if submitResult === 'error'}
      <p class="form-error">{i18n.contactFormErrorText}</p>
    {/if}
  </form>
{/if}

<style>
  form {
    font-family: inherit;
  }

  .form-title {
    font-size: 1.5em;
    margin-bottom: 1em;
    color: #333;
  }

  .form-success {
    text-align: center;
    padding: 2em;
  }

  .form-success h3 {
    color: #4FA4DB;
    margin-bottom: 0.5em;
  }

  .field {
    margin-bottom: 1em;
  }

  .field-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.3em;
    font-size: 0.95em;
  }

  .required {
    color: #dd3333;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    width: 100%;
    padding: 0.6em 0.8em;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.95em;
    transition: border-color 0.2s;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #4FA4DB;
    box-shadow: 0 0 0 2px rgba(79, 164, 219, 0.2);
  }

  textarea {
    resize: vertical;
  }

  .form-row {
    display: flex;
    gap: 1em;
  }

  .half {
    flex: 1;
  }

  .consent-note {
    font-size: 0.85em;
    color: #666;
    margin-bottom: 1em;
    line-height: 1.5;
  }

  .consent-note a {
    color: #4FA4DB;
    text-decoration: underline;
  }

  .field-error {
    color: #dd3333;
    font-size: 0.85em;
    margin-top: 0.2em;
  }

  .form-error {
    color: #dd3333;
    text-align: center;
    margin-top: 1em;
  }

  .turnstile-field {
    margin-bottom: 1em;
  }

  .honeypot {
    position: absolute;
    left: -9999px;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  .btn-submit {
    display: block;
    width: 100%;
    padding: 1em;
    border: none;
    border-radius: 4em;
    background: #4FA4DB;
    color: #fff;
    font-family: inherit;
    font-size: 17px;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .btn-submit:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    .form-row {
      flex-direction: column;
      gap: 0;
    }
  }
</style>
