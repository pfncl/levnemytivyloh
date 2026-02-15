<script lang="ts">
  import { t, type Locale } from '../i18n/translations';

  interface Props {
    lang?: Locale;
  }

  let { lang = 'cs' }: Props = $props();
  const i18n = $derived(t(lang));

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

      <a href="/" class="mobile-logo">
        <img src="/images/logo_levnemytivyloh.png" alt="Levné mytí výloh" width="193" height="73">
      </a>

      <div class="mobile-nav">
        <a href="/" class="mobile-nav-link" onclick={close}>O nás</a>
        <a href="/objednavkovy-formular/" class="mobile-nav-link" onclick={close}>Objednávkový formulář</a>
        <a href="/portfolio-sluzeb/" class="mobile-nav-link" onclick={close}>Naše reference</a>
        <a href="/kontakty/" class="mobile-nav-link" onclick={close}>Kontakty</a>
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
