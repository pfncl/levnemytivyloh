import type { Locale } from '../i18n/translations';

export interface Service {
  title: string;
  price: string;
  popupId: string;
}

const servicesData: Record<Locale, Service[]> = {
  cs: [
    { title: 'Mytí výloh', price: 'od 19 Kč/m2', popupId: 'myti-vyloh' },
    { title: 'Mytí oken', price: 'od 25 Kč/m2', popupId: 'myti-oken' },
    { title: 'Výškové práce', price: 'od 30 Kč/m2', popupId: 'vyskove-prace' },
    { title: 'Stop pavoukům', price: 'od 20 Kč/m2', popupId: 'stop-pavoukum' },
  ],
  en: [
    { title: 'Storefront cleaning', price: 'from 19 CZK/m2', popupId: 'myti-vyloh' },
    { title: 'Window cleaning', price: 'from 25 CZK/m2', popupId: 'myti-oken' },
    { title: 'High-altitude work', price: 'from 30 CZK/m2', popupId: 'vyskove-prace' },
    { title: 'Spider removal', price: 'from 20 CZK/m2', popupId: 'stop-pavoukum' },
  ],
};

export function getServices(lang: Locale): Service[] {
  return servicesData[lang];
}
