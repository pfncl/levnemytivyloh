import type { Locale } from '../i18n/translations';

export interface Step {
  title: string;
  subtitle: string;
  image: string;
  popupId: string;
}

const stepsData: Record<Locale, Step[]> = {
  cs: [
    {
      title: 'Špinavé sklo',
      subtitle: 'čistíte prosklené plochy nebo výlohy v Praze?',
      image: '/images/krok1-2.png',
      popupId: 'myti-vyloh',
    },
    {
      title: 'Objednávka',
      subtitle: 'zavolám nebo odešlu objednávkový formulář',
      image: '/images/krok2.png',
      popupId: 'objednavka-info',
    },
    {
      title: 'Potvrzení nabídky',
      subtitle: 'potvrdím cenovou nabídku a termín',
      image: '/images/krok3-1.png',
      popupId: 'potvrzeni',
    },
    {
      title: 'Realizace',
      subtitle: 'komfortní čištění ploch dle objednávky, předání',
      image: '/images/krok4-1.png',
      popupId: 'realizace',
    },
    {
      title: 'Jsem spokojený',
      subtitle: 'platba na místě nebo bankovním převodem',
      image: '/images/krok5-3.png',
      popupId: 'spokojeny',
    },
  ],
  en: [
    {
      title: 'Dirty glass',
      subtitle: 'do you clean glass surfaces or storefronts in Prague?',
      image: '/images/krok1-2.png',
      popupId: 'myti-vyloh',
    },
    {
      title: 'Order',
      subtitle: 'I will call or submit an order form',
      image: '/images/krok2.png',
      popupId: 'objednavka-info',
    },
    {
      title: 'Quote confirmation',
      subtitle: 'I will confirm the price quote and date',
      image: '/images/krok3-1.png',
      popupId: 'potvrzeni',
    },
    {
      title: 'Realization',
      subtitle: 'comfortable cleaning of surfaces as ordered, handover',
      image: '/images/krok4-1.png',
      popupId: 'realizace',
    },
    {
      title: 'Satisfied',
      subtitle: 'payment on-site or by bank transfer',
      image: '/images/krok5-3.png',
      popupId: 'spokojeny',
    },
  ],
};

export function getSteps(lang: Locale): Step[] {
  return stepsData[lang];
}
