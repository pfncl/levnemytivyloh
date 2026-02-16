export type Locale = 'cs' | 'en';

const translations = {
  cs: {
    // Header / MobileMenu
    orderButton: 'OBJEDNÁVKA',
    close: 'Zavřít',

    // Navigation
    navAbout: 'O nás',
    navOrderForm: 'Objednávkový formulář',
    navReferences: 'Naše reference',
    navContacts: 'Kontakty',

    // Hero
    heroTitle: 'Profesionální úklidové a čistící práce v Praze',
    heroSubtitle: 'Alabastr Clean s.r.o.',
    swipeHint: 'Přejeďte prstem \u00a0→',
    clickHint: 'Kliknutím na obrázek zobrazíte více informací',

    // About
    aboutTitle: 'Představení firmy',
    aboutText: 'Jsme úklidová firma působící na trhu servisních úklidů, mytí oken a výloh již dvacet let. Naši profesionální pracovníci jsou vyškoleni na mytí běžně znečistěných prosklených ploch, mytí výloh a oken po malířských, řemeslnických, stavebních i jiných pracích, odstraňujeme reklamní polepy, loga apod. Samozřejmostí je mytí oken včetně rámů, vnitřních i venkovních parapetů. Mytí provádíme profesionální technikou značky UNGER, používáme ekologické mycí prostředky. Ke každé zakázce přistupujeme s nejvyšší zodpovědností, naši pracovníci jsou dobře pojištěni na případnou škodu způsobenou při práci.',

    // Pricing / Services
    pricingOrderButton: 'Objednejte teď',
    pricingWindowTitle: 'Mytí oken',
    pricingWindowPrice: 'od 25 Kč/m²',
    pricingWindowDesc: 'Mytí oken provádíme v bytech, rodinných domech a komerčních prostorech. Samozřejmostí je mytí oken včetně rámů, vnitřních i venkovních parapetů. Mytí provádíme profesionální technikou značky UNGER, používáme ekologické mycí prostředky. Veškeré ceny zahrnují dopravu na území Prahy.',
    pricingWindowFeature1: 'Doprava po Praze zdarma',
    pricingWindowFeature2: 'Pojištění proti způsobené škodě',
    pricingStorefrontTitle: 'Mytí výloh',
    pricingStorefrontPrice: 'od 19 Kč/m²',
    pricingStorefrontDesc: 'Provádíme pravidelné i jednorázové mytí výloh v termínu a cyklu zadaném zákazníkem profesionální technikou značky UNGER. Mytí až do výšky 9 metrů teleskopickými tyčemi. Realizujeme mytí výloh pro obchodní centra, obchodní řetězce, autosalony, čerpací stanice apod. Veškeré ceny zahrnují dopravu na území Prahy.',
    pricingStorefrontFeature1: 'Doprava po Praze zdarma',
    pricingStorefrontFeature2: 'Pojištění proti způsobené škodě',
    pricingHighAltTitle: 'Výškové práce',
    pricingHighAltPrice: 'od 30 Kč/m²',
    pricingHighAltDesc: 'Čistíme prosklené plochy a těžko přístupná místa horolezeckou technikou. Práce ve výškách realizovaná horolezeckou technikou je podstatně levnější než prováděná za pomoci lešení nebo montážních plošin.',
    pricingHighAltFeature1: 'Doprava po Praze dohodou',
    pricingHighAltFeature2: 'Pojištění proti způsobené škodě',

    // Contacts
    contactTechnical: 'Kontaktujte mne pro technické a provozní záležitosti',
    contactBusiness: 'Kontaktujte mne pro obchodní a marketingové záležitosti',

    // Sidebar
    sidebarBrochureLabel: 'Stáhněte si náš leták',

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

    // Contact form
    contactFormTitle: 'Napište nám',
    contactFormName: 'Vaše jméno',
    contactFormEmail: 'E-mail',
    contactFormPhone: 'Telefon',
    contactFormMessage: 'Vaše zpráva',
    contactFormSubmit: 'Odeslat zprávu',
    contactFormSubmitting: 'Odesílám...',
    contactFormSuccessTitle: 'Děkujeme za Vaši zprávu!',
    contactFormSuccessText: 'Budeme Vás co nejdříve kontaktovat.',
    contactFormErrorText: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.',

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

    // Navigation
    navAbout: 'About us',
    navOrderForm: 'Order form',
    navReferences: 'Our references',
    navContacts: 'Contacts',

    // Hero
    heroTitle: 'Professional Cleaning Services in Prague',
    heroSubtitle: 'Alabastr Clean s.r.o.',
    swipeHint: 'Swipe \u00a0→',
    clickHint: 'Click on image for more information',

    // About
    aboutTitle: 'About Us',
    aboutText: 'We are a cleaning company operating in the market of service cleaning, window and storefront washing for twenty years. Our professional workers are trained in cleaning standard soiled glass surfaces, washing storefronts and windows after painting, craft, construction and other work, removing advertising stickers, logos, etc. Window cleaning including frames, interior and exterior sills is a matter of course. We use professional UNGER brand equipment and eco-friendly cleaning products. We approach every job with the highest responsibility, and our workers are well insured against any damage caused during work.',

    // Pricing / Services
    pricingOrderButton: 'Order now',
    pricingWindowTitle: 'Window Cleaning',
    pricingWindowPrice: 'from 25 CZK/m²',
    pricingWindowDesc: 'We clean windows in apartments, family houses and commercial spaces. Window cleaning including frames, interior and exterior sills is a matter of course. We use professional UNGER brand equipment and eco-friendly cleaning products. All prices include transport within Prague.',
    pricingWindowFeature1: 'Free transport within Prague',
    pricingWindowFeature2: 'Insurance against damage',
    pricingStorefrontTitle: 'Storefront Cleaning',
    pricingStorefrontPrice: 'from 19 CZK/m²',
    pricingStorefrontDesc: 'We provide regular and one-time storefront cleaning at the date and cycle specified by the customer using professional UNGER brand equipment. Cleaning up to 9 meters with telescopic poles. We clean storefronts for shopping centers, retail chains, car dealerships, gas stations, etc. All prices include transport within Prague.',
    pricingStorefrontFeature1: 'Free transport within Prague',
    pricingStorefrontFeature2: 'Insurance against damage',
    pricingHighAltTitle: 'High-Altitude Work',
    pricingHighAltPrice: 'from 30 CZK/m²',
    pricingHighAltDesc: 'We clean glass surfaces and hard-to-reach places using climbing techniques. High-altitude work using climbing techniques is significantly cheaper than using scaffolding or assembly platforms.',
    pricingHighAltFeature1: 'Transport within Prague by agreement',
    pricingHighAltFeature2: 'Insurance against damage',

    // Contacts
    contactTechnical: 'Contact me for technical and operational matters',
    contactBusiness: 'Contact me for business and marketing matters',

    // Sidebar
    sidebarBrochureLabel: 'Download our brochure',

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

    // Contact form
    contactFormTitle: 'Get in Touch',
    contactFormName: 'Your name',
    contactFormEmail: 'Email',
    contactFormPhone: 'Phone',
    contactFormMessage: 'Your message',
    contactFormSubmit: 'Send message',
    contactFormSubmitting: 'Sending...',
    contactFormSuccessTitle: 'Thank you for your message!',
    contactFormSuccessText: 'We will contact you as soon as possible.',
    contactFormErrorText: 'Failed to send the message. Please try again.',

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
