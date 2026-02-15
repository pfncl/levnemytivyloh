<script lang="ts">
  import { t, type Locale } from '../i18n/translations';

  interface Props {
    lang?: Locale;
  }

  let { lang = 'cs' }: Props = $props();
  const i18n = $derived(t(lang));

  let services = $state<string[]>([]);
  let companyName = $state('');
  let email = $state('');
  let phone = $state('');
  let street = $state('');
  let city = $state('');
  let zip = $state('');
  let serviceDay = $state('');
  let serviceMonth = $state('');
  let serviceYear = $state('');
  let notes = $state('');

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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);
  const months = i18n.months;

  function toggleService(service: string) {
    if (services.includes(service)) {
      services = services.filter(s => s !== service);
    } else {
      services = [...services, service];
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (services.length === 0) newErrors.services = i18n.formSelectService;
    if (!companyName.trim()) newErrors.companyName = i18n.formRequired;
    if (!email.trim()) newErrors.email = i18n.formRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = i18n.formInvalidEmail;
    if (!phone.trim()) newErrors.phone = i18n.formRequired;
    if (!street.trim()) newErrors.street = i18n.formRequired;
    if (!city.trim()) newErrors.city = i18n.formRequired;
    if (!zip.trim()) newErrors.zip = i18n.formRequired;

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
      const { error } = await actions.sendOrder({
        services,
        companyName,
        email,
        phone,
        street,
        city,
        zip,
        serviceDate: serviceDay && serviceMonth && serviceYear
          ? `${serviceDay}.${serviceMonth}.${serviceYear}`
          : '',
        notes,
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
    <h3>{i18n.formSuccessTitle}</h3>
    <p>{i18n.formSuccessText}</p>
  </div>
{:else}
  <form onsubmit={handleSubmit} onfocusin={loadTurnstile} novalidate>
    <h3 class="form-title">{i18n.formTitle}</h3>

    <fieldset class="field-group">
      <legend class="field-label">{i18n.formServiceLabel} <span class="required">*</span></legend>
      <div class="checkbox-group">
        {#each i18n.serviceOptions as service}
          <label class="checkbox-label">
            <input
              type="checkbox"
              checked={services.includes(service)}
              onchange={() => toggleService(service)}
            >
            {service}
          </label>
        {/each}
      </div>
      <p class="field-description">{i18n.formServiceHint}</p>
      {#if errors.services}<p class="field-error">{errors.services}</p>{/if}
    </fieldset>

    <div class="field">
      <label class="field-label" for="companyName">
        {i18n.formCompanyLabel} <span class="required">*</span>
      </label>
      <input type="text" id="companyName" bind:value={companyName}>
      {#if errors.companyName}<p class="field-error">{errors.companyName}</p>{/if}
    </div>

    <div class="form-row">
      <div class="field half">
        <label class="field-label" for="email">{i18n.formEmailLabel} <span class="required">*</span></label>
        <input type="email" id="email" bind:value={email}>
        {#if errors.email}<p class="field-error">{errors.email}</p>{/if}
      </div>
      <div class="field half">
        <label class="field-label" for="phone">{i18n.formPhoneLabel} <span class="required">*</span></label>
        <input type="tel" id="phone" bind:value={phone}>
        {#if errors.phone}<p class="field-error">{errors.phone}</p>{/if}
      </div>
    </div>

    <fieldset class="field-group">
      <legend class="field-label">{i18n.formAddressLabel} <span class="required">*</span></legend>
      <div class="field">
        <label class="field-sublabel" for="street">{i18n.formStreetLabel}</label>
        <input type="text" id="street" bind:value={street}>
        {#if errors.street}<p class="field-error">{errors.street}</p>{/if}
      </div>
      <div class="form-row">
        <div class="field half">
          <label class="field-sublabel" for="city">{i18n.formCityLabel}</label>
          <input type="text" id="city" bind:value={city}>
          {#if errors.city}<p class="field-error">{errors.city}</p>{/if}
        </div>
        <div class="field half">
          <label class="field-sublabel" for="zip">{i18n.formZipLabel}</label>
          <input type="text" id="zip" bind:value={zip}>
          {#if errors.zip}<p class="field-error">{errors.zip}</p>{/if}
        </div>
      </div>
    </fieldset>

    <fieldset class="field-group">
      <legend class="field-label">{i18n.formDateLabel}</legend>
      <div class="form-row date-row">
        <select bind:value={serviceDay}>
          <option value="">{i18n.formDayPlaceholder}</option>
          {#each Array.from({ length: 31 }, (_, i) => i + 1) as day}
            <option value={String(day)}>{day}</option>
          {/each}
        </select>
        <select bind:value={serviceMonth}>
          <option value="">{i18n.formMonthPlaceholder}</option>
          {#each months as name}
            <option value={name}>{name}</option>
          {/each}
        </select>
        <select bind:value={serviceYear}>
          <option value="">{i18n.formYearPlaceholder}</option>
          {#each years as year}
            <option value={String(year)}>{year}</option>
          {/each}
        </select>
      </div>
    </fieldset>

    <div class="field">
      <label class="field-label" for="notes">{i18n.formNotesLabel}</label>
      <textarea id="notes" bind:value={notes} rows="5"></textarea>
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
      {submitting ? i18n.formSubmitting : i18n.formSubmit}
    </button>

    {#if submitResult === 'error'}
      <p class="form-error">{i18n.formErrorText}</p>
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

  .field-group {
    border: none;
    padding: 0;
    margin-bottom: 1em;
  }

  .field-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.3em;
    font-size: 0.95em;
  }

  .field-sublabel {
    display: block;
    font-size: 0.85em;
    color: #666;
    margin-bottom: 0.2em;
  }

  .required {
    color: #dd3333;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea,
  select {
    width: 100%;
    padding: 0.6em 0.8em;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.95em;
    transition: border-color 0.2s;
  }

  input:focus,
  textarea:focus,
  select:focus {
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

  .date-row {
    gap: 0.5em;
  }

  .date-row select {
    flex: 1;
  }

  .checkbox-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.3em;
    margin-bottom: 0.5em;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.5em;
    cursor: pointer;
    line-height: 1.5;
  }

  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin-top: 0.3em;
    flex-shrink: 0;
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

  .field-description {
    font-size: 0.85em;
    color: #666;
    margin-top: 0.3em;
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
    .date-row {
      flex-direction: row;
      gap: 3px;
    }
    .checkbox-group {
      grid-template-columns: 1fr;
    }
  }
</style>
