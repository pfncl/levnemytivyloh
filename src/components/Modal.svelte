<script lang="ts">
  import { untrack } from 'svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    size?: 'tiny' | 'large';
    onclose?: () => void;
    children?: Snippet;
  }

  let { open = $bindable(), size = 'tiny', onclose, children }: Props = $props();

  let dialogEl: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (!dialogEl) return;
    const isDialogOpen = untrack(() => dialogEl!.open);
    if (open && !isDialogOpen) {
      dialogEl.showModal();
    } else if (!open && isDialogOpen) {
      dialogEl.close();
    }
  });

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialogEl) {
      handleClose();
    }
  }

  function handleCancel(e: Event) {
    e.preventDefault();
    handleClose();
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogEl}
  class="modal {size === 'large' ? 'modal-large' : 'modal-tiny'}"
  onclick={handleBackdropClick}
  oncancel={handleCancel}
>
  <div class="modal-box">
    <button type="button" class="modal-close" onclick={handleClose} aria-label="Zavřít">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="modal-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</dialog>

<style>
  /* ===== Base ===== */
  dialog.modal {
    border: none;
    background: transparent;
  }

  dialog.modal::backdrop {
    background: rgba(255, 255, 255, 0.60);
  }

  /* ===== TINY: centered popup ===== */
  dialog.modal-tiny {
    width: min(400px, calc(100vw - 40px));
    margin: auto;
    padding: 0;
    overflow: visible;
  }

  .modal-tiny .modal-content {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  /* ===== LARGE: full-viewport scroll container (looks like page scroll) ===== */
  dialog.modal-large[open] {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
    padding: 40px 0 30px;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .modal-large .modal-box {
    width: min(900px, calc(100vw - 40px));
    flex-shrink: 0;
  }

  /* ===== The visible box ===== */
  .modal-box {
    position: relative;
    padding: 18px;
    border-radius: 3px;
    border: 6px solid #50a3df;
    box-shadow: 0 0 30px 0 rgba(255, 255, 255, 1);
    background: #fff;
  }

  /* ===== Close button ===== */
  .modal-close {
    position: absolute;
    top: -13px;
    right: -13px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #dd3333;
    color: #fff;
    border: 2px solid #fff;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .modal-close:hover {
    background: #c02020;
  }

  /* ===== Content ===== */
  .modal-content {
    color: #000;
    font-weight: 100;
    line-height: 1.6;
  }

  /* ===== Mobile ===== */
  @media (max-width: 600px) {
    dialog.modal-large {
      padding: 30px 0 20px;
    }

    .modal-large .modal-box {
      width: calc(100vw - 20px);
    }

    .modal-box {
      padding: 14px;
    }
  }
</style>
