<script lang="ts">
  interface Props {
    title: string;
    price: string;
    popupContent: string;
    features: string[];
    buttonLabel?: string;
    featured?: boolean;
  }

  let { title, price, popupContent, features, buttonLabel = 'Objednejte teď', featured = false }: Props = $props();
</script>

<div class="pricing-card" class:featured>
  <h3 class="pricing-title">{title}</h3>
  <p class="pricing-price">{price}</p>
  <button type="button" class="btn-order" data-open-modal="order-form">{buttonLabel}</button>
  <p class="pricing-description">{@html popupContent}</p>
  <div class="pricing-features">
    {#each features as feature}
      <div class="pricing-feature">
        <span class="feature-check">&#10003;</span>
        <span>{feature}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .pricing-card {
    background: #fff;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s;
  }

  .pricing-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }

  .pricing-card.featured {
    padding: 38px 36px;
    border: 3px solid #40A4DB;
    box-shadow: 0 4px 20px rgba(80, 163, 223, 0.12);
  }

  .pricing-card.featured .pricing-title {
    font-size: 24px;
  }

  .pricing-card.featured .pricing-price {
    font-size: 16px;
  }

  .pricing-title {
    font-size: 22px;
    color: #222;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .pricing-price {
    font-size: 15px;
    color: #888;
    margin-bottom: 20px;
  }

  .btn-order {
    display: block;
    width: 100%;
    text-align: center;
    padding: 12px 24px;
    border-radius: 8px;
    border: none;
    background: #50a3df;
    color: #fff;
    font-family: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-bottom: 24px;
  }

  .btn-order:hover {
    background: #3d8fcc;
  }

  .pricing-description {
    font-size: 14px;
    color: #666;
    line-height: 1.7;
    margin-bottom: 20px;
    flex: 1;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 14px 18px;
  }

  .pricing-features {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
  }

  .pricing-feature {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #555;
  }

  .feature-check {
    color: #50a3df;
    font-size: 15px;
  }
</style>
