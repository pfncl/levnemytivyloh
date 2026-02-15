export type Locale = 'cs' | 'en';

const translations = {
  cs: {
    // Header / MobileMenu
    orderButton: 'OBJEDNÁVKA',
    close: 'Zavřít',

    // Hero
    heroTitle: 'Představení firmy',
    heroSubtitle: '',
    swipeHint: '',
    clickHint: '',

    // References
    references: 'NAŠE REFERENCE',

    // Order form
    formTitle: 'Objednávkový formulář',
    formServiceLabel: 'Služba',
    formServiceHint: 'V případě zájmu o kombinované služby zatrhněte všechny vámi požadované.',
    formCompanyLabel: 'Název společnosti/Kontaktní osoba',
    formEmailLabel: 'E-mail',
    formPhoneLabel: 'Telefon',
    formAddressLabel: 'Adresa pro výkon objednané služby',
    formStreetLabel: 'Ulice a č.p.',
    formCityLabel: 'Město',
    formZipLabel: 'PSČ',
    formDateLabel: 'Datum výkonu služby',
    formDayPlaceholder: 'Den',
    formMonthPlaceholder: 'Měsíc',
    formYearPlaceholder: 'Rok',
    formNotesLabel: 'Orientační velikost čištěných ploch a jiné poznámky',
    formConsentText: 'Odesláním formuláře souhlasíte se',
    formConsentLink: 'zpracováním osobních údajů',
    formConsentCompany: 'Správcem osobních údajů je společnost Alabastr Clean, s.r.o.',
    formSubmit: 'Odeslat',
    formSubmitting: 'Odesílám...',
    formSuccessTitle: 'Děkujeme za Vaši objednávku!',
    formSuccessText: 'Budeme Vás co nejdříve kontaktovat.',
    formErrorText: 'Nepodařilo se odeslat formulář. Zkuste to prosím znovu.',
    formRequired: 'Povinný údaj.',
    formInvalidEmail: 'Neplatný e-mail.',
    formSelectService: 'Vyberte alespoň jednu službu.',
    formTurnstileError: 'Ověření nebylo dokončeno.',
    privacyPolicyUrl: '/zasady-ochrany-osobnich-udaju',
    months: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'],
    serviceOptions: ['Mytí výloh', 'Mytí oken', 'Výškové práce', 'Stop pavoukům'],

    // Cookie consent
    cookieTitle: 'Spravovat Souhlas s cookies',
    cookieText: 'Abychom poskytli co nejlepší služby, používáme k ukládání a/nebo přístupu k informacím o zařízení, technologie jako jsou soubory cookies. Souhlas s těmito technologiemi nám umožní zpracovávat údaje, jako je chování při procházení nebo jedinečná ID na tomto webu.',
    cookieAccept: 'Příjmout',
    cookieDeny: 'Odmítnout',
    cookieSave: 'Uložit předvolby',
    cookieShowPrefs: 'Zobrazit předvolby',
    cookieAlwaysActive: 'Vždy aktivní',
    cookieOn: 'Zapnuto',
    cookieOff: 'Vypnuto',
    cookieFunctionalTitle: 'Funkční',
    cookieFunctionalDesc: 'Technické uložení nebo přístup je nezbytně nutný pro legitimní účel umožnění použití konkrétní služby, kterou si odběratel nebo uživatel výslovně vyžádal.',
    cookiePreferencesTitle: 'Předvolby',
    cookiePreferencesDesc: 'Technické uložení nebo přístup je nezbytný pro legitimní účel ukládání preferencí, které nejsou požadovány odběratelem nebo uživatelem.',
    cookieStatisticsTitle: 'Statistiky',
    cookieStatisticsDesc: 'Technické uložení nebo přístup, který se používá výhradně pro statistické účely.',
    cookieMarketingTitle: 'Marketing',
    cookieMarketingDesc: 'Technické uložení nebo přístup je nutný k vytvoření uživatelských profilů za účelem zasílání reklamy nebo sledování uživatele.',

    // SEO
    seoTitle: 'Levné mytí výloh – Praha – Úklidové a čistící práce',
    seoDescription: 'Profesionální mytí oken, výloh a prosklených ploch v Praze a okolí. Pravidelné i jednorázové služby pro obchody, restaurace a kanceláře. 20 let zkušeností, ekologické prostředky, pojištění pracovníků. Alabastr Clean, s.r.o.',
    seoDefaultDescription: 'Profesionální mytí oken, výloh a prosklených ploch v Praze a okolí. Alabastr Clean, s.r.o.',
    seoLocale: 'cs_CZ',
  },
  en: {
    // Header / MobileMenu
    orderButton: 'ORDER FORM',
    close: 'Close',

    // Hero
    heroTitle: 'About us',
    heroSubtitle: '',
    swipeHint: '',
    clickHint: '',

    // References
    references: 'REFERENCES',

    // Order form
    formTitle: 'Order Form',
    formServiceLabel: 'Service',
    formServiceHint: 'If you are interested in combined services, check all that you require.',
    formCompanyLabel: 'Company name / Contact person',
    formEmailLabel: 'Email',
    formPhoneLabel: 'Phone',
    formAddressLabel: 'Address for the ordered service',
    formStreetLabel: 'Street and Number',
    formCityLabel: 'City',
    formZipLabel: 'Postal code',
    formDateLabel: 'Service date',
    formDayPlaceholder: 'Day',
    formMonthPlaceholder: 'Month',
    formYearPlaceholder: 'Year',
    formNotesLabel: 'Approximate size of surfaces to be cleaned and other notes',
    formConsentText: 'By submitting this form you agree to the',
    formConsentLink: 'processing of personal data',
    formConsentCompany: 'The data controller is Alabastr Clean, s.r.o.',
    formSubmit: 'Submit',
    formSubmitting: 'Submitting...',
    formSuccessTitle: 'Thank you for your order!',
    formSuccessText: 'We will contact you as soon as possible.',
    formErrorText: 'Failed to submit the form. Please try again.',
    formRequired: 'Required field.',
    formInvalidEmail: 'Invalid email.',
    formSelectService: 'Please select at least one service.',
    formTurnstileError: 'Verification not completed.',
    privacyPolicyUrl: '/en/privacy-policy',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    serviceOptions: ['Window display cleaning', 'Window cleaning', 'High-altitude work', 'Spider removal'],

    // Cookie consent
    cookieTitle: 'Manage Cookie Consent',
    cookieText: 'To provide the best experience, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site.',
    cookieAccept: 'Accept',
    cookieDeny: 'Deny',
    cookieSave: 'Save preferences',
    cookieShowPrefs: 'Show preferences',
    cookieAlwaysActive: 'Always active',
    cookieOn: 'On',
    cookieOff: 'Off',
    cookieFunctionalTitle: 'Functional',
    cookieFunctionalDesc: 'Technical storage or access is strictly necessary for the legitimate purpose of enabling the use of a specific service explicitly requested by the subscriber or user.',
    cookiePreferencesTitle: 'Preferences',
    cookiePreferencesDesc: 'Technical storage or access is necessary for the legitimate purpose of storing preferences that are not requested by the subscriber or user.',
    cookieStatisticsTitle: 'Statistics',
    cookieStatisticsDesc: 'Technical storage or access that is used exclusively for statistical purposes.',
    cookieMarketingTitle: 'Marketing',
    cookieMarketingDesc: 'Technical storage or access is required to create user profiles for sending advertising or tracking the user.',

    // SEO
    seoTitle: 'Affordable Window Cleaning – Prague – Cleaning Services',
    seoDescription: 'Professional window, storefront and glass surface cleaning in Prague and surroundings. Regular and one-time services for shops, restaurants and offices. 20 years of experience, eco-friendly products, insured workers. Alabastr Clean, s.r.o.',
    seoDefaultDescription: 'Professional window, storefront and glass surface cleaning in Prague and surroundings. Alabastr Clean, s.r.o.',
    seoLocale: 'en_US',
  },
} as const;

export type TranslationKey = keyof typeof translations.cs;
export type Translations = (typeof translations)[Locale];

export function t(lang: Locale): Translations {
  return translations[lang];
}
