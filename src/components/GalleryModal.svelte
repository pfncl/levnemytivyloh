<script lang="ts">
  import Modal from './Modal.svelte';
  import { galleryImages } from '../data/gallery';

  let open = $state(false);

  $effect(() => {
    function handleClick(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest?.('[data-open-modal="gallery"]')) {
        open = true;
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
</script>

<div class="gallery-trigger">
  <button type="button" class="btn-gallery" onclick={() => open = true}>
    <span class="icon-file-image"></span>
    FOTOGALERIE
  </button>
</div>

<Modal bind:open size="large">
  <div class="gallery-grid">
    {#each galleryImages as img}
      <figure class="gallery-item">
        <img src={img.src} alt={img.alt} loading="lazy">
      </figure>
    {/each}
  </div>
</Modal>

<style>
  .gallery-trigger {
    text-align: center;
    margin: 2em 0;
  }

  .btn-gallery {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 1.2em 2.5em;
    border-radius: 4em;
    background: var(--color-primary, #4FA4DB);
    color: #fff;
    border: none;
    font-family: inherit;
    font-size: 17px;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .btn-gallery:hover {
    opacity: 0.9;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .gallery-item {
    margin: 0;
  }

  .gallery-item img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 2px;
  }

  @media (max-width: 600px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
