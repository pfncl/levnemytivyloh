<script lang="ts">
  import { t, type Locale } from '../i18n/translations';

  interface Props {
    lang?: Locale;
  }

  let { lang = 'cs' }: Props = $props();
  const i18n = $derived(t(lang));
  const homeHref = $derived(lang === 'en' ? '/en/' : '/');

  let open = $state(false);

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }
</script>

<button type="button" class="hamburger" onclick={toggle} aria-label="Menu">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="mobile-overlay" onclick={(e) => { if (e.target === e.currentTarget) close(); }} onkeydown={(e) => e.key === 'Escape' && close()}>
    <nav class="mobile-menu">
      <button type="button" class="mobile-close" onclick={close} aria-label={i18n.close}>
        <span class="icon-cancel"></span>
      </button>

      <a href={homeHref} class="mobile-logo">
        <img src="/images/logo_levnemytivyloh.png" alt="Levné mytí výloh" width="193" height="73">
      </a>

      <div class="mobile-nav">
        <a href={homeHref} class="mobile-nav-link" onclick={close}>{i18n.navAbout}</a>
        <a href={lang === 'en' ? '/en/order-form/' : '/objednavkovy-formular/'} class="mobile-nav-link" onclick={close}>{i18n.navOrderForm}</a>
        <a href={lang === 'en' ? '/en/portfolio/' : '/portfolio-sluzeb/'} class="mobile-nav-link" onclick={close}>{i18n.navReferences}</a>
        <a href={lang === 'en' ? '/en/contacts/' : '/kontakty/'} class="mobile-nav-link" onclick={close}>{i18n.navContacts}</a>
      </div>

      <div class="mobile-flags">
        <a href="/" class="mobile-flag" class:dimmed={lang === 'cs'} aria-label="Česky" onclick={close}>
          <svg viewBox="0 0 24 24" width="28" height="28"><clipPath id="mFlagCs"><circle cx="12" cy="12" r="11"/></clipPath><g clip-path="url(#mFlagCs)"><rect y="0" width="24" height="12" fill="#fff"/><rect y="12" width="24" height="12" fill="#d7141a"/><polygon points="0,0 12,12 0,24" fill="#11457e"/></g><circle cx="12" cy="12" r="11" fill="none" stroke="#ccc" stroke-width="0.5"/></svg>
        </a>
        <a href="/en/" class="mobile-flag" class:dimmed={lang === 'en'} aria-label="English" onclick={close}>
          <svg viewBox="0 0 24 24" width="28" height="28"><clipPath id="mFlagEn"><circle cx="12" cy="12" r="11"/></clipPath><g clip-path="url(#mFlagEn)"><rect width="24" height="24" fill="#012169"/><path d="M0,0 L24,24 M24,0 L0,24" stroke="#fff" stroke-width="4"/><path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" stroke-width="2"/><path d="M12,0 V24 M0,12 H24" stroke="#fff" stroke-width="6"/><path d="M12,0 V24 M0,12 H24" stroke="#C8102E" stroke-width="3.5"/></g><circle cx="12" cy="12" r="11" fill="none" stroke="#ccc" stroke-width="0.5"/></svg>
        </a>
      </div>

      <div class="mobile-actions">
        <a href="tel:775351116" class="btn-phone">
          <span class="icon-phone"></span> David: 775 351 116
        </a>
        <a href="tel:608820647" class="btn-phone">
          <span class="icon-phone"></span> Daniel: 608 820 647
        </a>
        <a href="mailto:info@levnemytivyloh.cz" class="btn-phone">
          <span class="icon-paper-plane-light"></span> info@levnemytivyloh.cz
        </a>
      </div>

      <div class="mobile-social">
        <a href="https://www.facebook.com/pages/Alabastr-Clean/537888146306354" class="social-link fb-link" aria-label="Facebook" target="_blank" rel="noopener nofollow">
          <span class="icon-iconmonstr-facebook-1"></span>
        </a>
      </div>
    </nav>
  </div>
{/if}

<style>
  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .hamburger-line {
    display: block;
    width: 28px;
    height: 3px;
    background: #333;
    border-radius: 2px;
    transition: transform 0.2s;
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(300px, 80vw);
    background: #3d404f;
    color: #fff;
    padding: 2em 1.5em;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .mobile-close {
    position: absolute;
    top: 1em;
    right: 1em;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5em;
    cursor: pointer;
  }

  .mobile-logo img {
    max-width: 160px;
    height: auto;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .mobile-nav-link {
    display: block;
    padding: 0.8em 0;
    color: #fff;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: color 0.2s;
  }

  .mobile-nav-link:hover {
    color: #50a3df;
  }

  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }

  :global(.mobile-menu .btn-phone) {
    color: #ccc;
    background: rgba(255, 255, 255, 0.1);
    text-align: center;
    justify-content: center;
  }

  .mobile-flags {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .mobile-flag {
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
  }

  .mobile-flag.dimmed {
    opacity: 0.4;
  }

  .mobile-flag:hover {
    opacity: 1;
  }

  .mobile-social {
    display: flex;
    gap: 1em;
    margin-top: auto;
  }

  .social-link {
    color: #fff;
    font-size: 1.3em;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .social-link:hover {
    opacity: 1;
  }

  .fb-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #1877F2;
    color: #fff;
    font-size: 14px;
    opacity: 0.9;
  }
</style>
