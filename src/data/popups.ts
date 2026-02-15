import type { Locale } from '../i18n/translations';

export interface PopupData {
  id: string;
  content: string;
  size: 'tiny' | 'large';
}

const popupsData: Record<Locale, Record<string, PopupData>> = {
  cs: {
    'myti-vyloh': {
      id: 'myti-vyloh',
      content: 'Běžné mytí výloh probíhá v pravidelných intervalech, týdně, 2x do měsíce a 1x za měsíc v závislosti na stupni znečistění.<br>Provádíme také jednorázové mytí.',
      size: 'tiny',
    },
    'objednavka-info': {
      id: 'objednavka-info',
      content: 'Obratem Vás kontaktuje hlavní manažer firmy na Vámi uvedený kontakt.',
      size: 'tiny',
    },
    'potvrzeni': {
      id: 'potvrzeni',
      content: 'Přijedeme osobně, využijeme aplikaci street view, zhodnotíme zakázku dle Vašeho popisu.<br>Naceníme požadovanou službu nejnižší možnou cenou při zachování nejvyšší kvality.',
      size: 'tiny',
    },
    'realizace': {
      id: 'realizace',
      content: 'Naši proškolení pracovníci realizovali zakázku v nejlepší možné kvalitě k Vaší plné spokojenosti. Jsme pojištěni pro krytí škody způsobené naší činností.',
      size: 'tiny',
    },
    'spokojeny': {
      id: 'spokojeny',
      content: 'Vedoucí pracovník Vám vystaví příjmový doklad pro hotovou platbu, nebo s Vámi vyplní předávací protokol, na základě kterého Vám bude vystavena faktura se splatností 14 dní. Vaše spokojenost je pro nás samozřejmostí a stojí vždy na prvním místě.',
      size: 'tiny',
    },
    'myti-oken': {
      id: 'myti-oken',
      content: 'Mytí oken probíhá v objektu objednavatele našimi proškolenými pracovníky v nejlepší možné kvalitě. Jsme pojištěni pro krytí škody způsobené naší činností.',
      size: 'tiny',
    },
    'vyskove-prace': {
      id: 'vyskove-prace',
      content: 'Mytí a čištění nepřístupných oken, fasád, výkladních a reklamních ploch, které probíhá v objektu objednavatele našimi proškolenými pracovníky v nejlepší možné kvalitě.',
      size: 'tiny',
    },
    'stop-pavoukum': {
      id: 'stop-pavoukum',
      content: 'Práce probíhá ve dvou fázích:<br>Tou první je pečlivé mechanické odstranění všech následků přítomnosti pavouků na Vašem obchodě/domě. Následuje aplikace hubícího prostředku, která zajistí beznávratné odstranění na dobu minimálně osmi týdnů. Po aplikaci zajistíme umytí prosklených ploch.',
      size: 'tiny',
    },
  },
  en: {
    'myti-vyloh': {
      id: 'myti-vyloh',
      content: 'Regular storefront cleaning takes place at regular intervals — weekly, twice a month, or once a month depending on the level of soiling.<br>We also provide one-time cleaning.',
      size: 'tiny',
    },
    'objednavka-info': {
      id: 'objednavka-info',
      content: 'Our head manager will contact you promptly at the contact information you provided.',
      size: 'tiny',
    },
    'potvrzeni': {
      id: 'potvrzeni',
      content: 'We will visit in person, use street view, and evaluate the job based on your description.<br>We will quote the requested service at the lowest possible price while maintaining the highest quality.',
      size: 'tiny',
    },
    'realizace': {
      id: 'realizace',
      content: 'Our trained workers completed the job in the best possible quality to your full satisfaction. We are insured to cover any damage caused by our work.',
      size: 'tiny',
    },
    'spokojeny': {
      id: 'spokojeny',
      content: 'The supervisor will issue a receipt for cash payment, or fill in a handover protocol with you, on the basis of which an invoice will be issued with a 14-day payment term. Your satisfaction is our priority and always comes first.',
      size: 'tiny',
    },
    'myti-oken': {
      id: 'myti-oken',
      content: 'Window cleaning is carried out at the client\'s premises by our trained workers in the best possible quality. We are insured to cover any damage caused by our work.',
      size: 'tiny',
    },
    'vyskove-prace': {
      id: 'vyskove-prace',
      content: 'Cleaning of hard-to-reach windows, facades, storefront and advertising surfaces, carried out at the client\'s premises by our trained workers in the best possible quality.',
      size: 'tiny',
    },
    'stop-pavoukum': {
      id: 'stop-pavoukum',
      content: 'The work takes place in two phases:<br>The first is careful mechanical removal of all traces of spider presence on your shop/house. This is followed by the application of an extermination agent, which ensures permanent removal for at least eight weeks. After application, we will clean the glass surfaces.',
      size: 'tiny',
    },
  },
};

export function getPopups(lang: Locale): Record<string, PopupData> {
  return popupsData[lang];
}
