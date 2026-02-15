<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let open = $state(false);
  let currentSrc = $state('');
  let currentAlt = $state('');

  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const img = target.closest('[data-lightbox]') as HTMLImageElement | null;
    if (img) {
      currentSrc = img.src;
      currentAlt = img.alt;
      open = true;
    }
  }

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={handleClick}>
  {@render children()}
</div>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="lightbox-overlay" onclick={close}>
    <button type="button" class="lightbox-close" onclick={close}>&times;</button>
    <img src={currentSrc} alt={currentAlt} class="lightbox-img">
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .lightbox-img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  }

  .lightbox-close {
    position: absolute;
    top: 20px;
    right: 24px;
    background: none;
    border: none;
    color: #fff;
    font-size: 36px;
    cursor: pointer;
    line-height: 1;
    padding: 4px 12px;
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  .lightbox-close:hover {
    opacity: 1;
  }
</style>
