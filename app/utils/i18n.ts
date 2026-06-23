import Papa from 'papaparse';

/**
 * Language code type - dynamic based on CSV
 */
export type LanguageCode = string;

/**
 * Translation record structure: { [language]: { [key]: value } }
 */
export type Translations = Record<LanguageCode, Record<string, string>>;

/**
 * Result from fetching translations
 */
export interface TranslationsResult {
  translations: Translations;
  languages: LanguageCode[];
  defaultLanguage: LanguageCode;
}

const TRANSLATIONS_SHEET_URL =
   'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxWCILmIzo6ZrEvntqFJx0s2DusYrJEMUQt7rnvMqO5shDdt3XE-k8ll7zCmm4_sIgC-B41WvGv81d/pub?gid=0&single=true&output=csv';

// Fallback translations in case CSV fails to load
const FALLBACK_TRANSLATIONS: Translations = {
  en: {
    // Navigation
    nav_about: 'About',
    nav_gallery: 'Gallery',
    nav_menu: 'Menu',
    nav_chef: 'Chef',
    nav_book_table: 'Book Table',
    nav_contact: 'Contact',

    // Header
    header_logo_alt: 'Restaurant Logo',
    header_open_menu: 'Open Menu',
    header_close_menu: 'Close Menu',

    // Hero
    hero_welcome: "Welcome to Biliakyn's!",
    hero_description: "Reverence can be tasted. At Biliakyn's, thoughtfulness is the primary ingredient in everything we create. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    hero_view_menu: 'View Menu',

    // About
    about_title: 'About Us',
    about_description: "Reverence can be tasted. Biliakyn's kitchen is lucid, elemental, and soulful. Our mission is to create experiences that engage every sense — dishes that restore the spirit, challenge the palate, and enrich the connection between the land and the plate.",
    about_we_are_title: 'We are!',
    about_we_are_description: "Elemental means force and stands for the living formative forces of the North. These forces are not visible, but their biologic 'footprints' are. At Biliakyn's, we observe and understand the invisible connections between the formative forces of nature and the physical matter of the ingredients we serve. Here, Toronto's premier dining meets the raw soul of the wilderness.",

    // Intro
    intro_title: 'Thoughtfulness in every detail.',
    intro_description: "Once a hidden club, now Toronto's premier destination for those who seek the extraordinary. A journey of the senses awaits.",
    intro_play_video: 'Play video',
    intro_pause_video: 'Pause video',

    // Menu
    menu_title: 'Menu',
    menu_selected: 'Selected',
    menu_no_items_selected: 'No items selected yet.',

    // Chef
    chef_title: 'Chef',
    chef_subtitle: 'Crafted with passion',
    chef_description: 'Every dish tells a story. Built on passion, precision, and respect for ingredients, each creation is designed to deliver more than taste — an experience that lingers and connects.',
    chef_biliak: 'Chef Biliak',
    chef_sous_chef: 'Sous-chef',

    // Gallery
    gallery_title: 'Gallery',
    gallery_description: "Explore our restaurant's atmosphere and delicious dishes through our curated gallery.",
    gallery_view_more: 'View More',
    gallery_view_less: 'View Less',

    // Booking
    booking_title: 'Book A Table',
    booking_full_name: 'Full Name',
    booking_full_name_placeholder: 'John Doe',
    booking_email: 'Email Address',
    booking_email_placeholder: 'example@mail.com',
    booking_phone: 'Phone Number',
    booking_phone_placeholder: '+1 (___) ___ ____',
    booking_party_size: 'Party Size',
    booking_1_guest: '1 guest',
    booking_2_guests: '2 guests',
    booking_3_guests: '3 guests',
    booking_4_guests: '4 guests',
    booking_5_plus_guests: '5+ guests',
    booking_time: 'Time',
    booking_date: 'Date',
    booking_special_requests: 'Special Requests',
    booking_special_requests_placeholder: 'Tell us anything...',
    booking_submit: 'Book',

    // Menu Item
    menu_item_view_photos: 'View Photos',

    // Floating Menu
    floating_menu_selected: 'Selected',

    // Footer
    footer_contact_us: 'Contact Us',
    footer_logo_alt: 'Biliakyn Dining restaurant logo',
    footer_quote: 'The secret of success is to treat every guest as if they were a member of your own family',
    footer_facebook_label: 'Facebook',
    footer_instagram_label: 'Instagram',
    footer_working_hours: 'Working Hours',
    footer_monday_friday: 'Monday – Friday',
    footer_monday_friday_hours: '08:00 am – 12:00 am',
    footer_saturday_sunday: 'Saturday – Sunday',
    footer_saturday_sunday_hours: '10:00 am – 12:00 am',
    footer_copyright: 'Biliakyn Dining. All rights reserved.',
  },
};

let translationsCache: Translations | null = null;
let availableLanguagesCache: LanguageCode[] | null = null;
let defaultLanguageCache: LanguageCode | null = null;

/**
 * Fetches and parses translations from the CSV source
 * Returns structured translations object with dynamic languages
 */
export const fetchTranslations = async (): Promise<TranslationsResult> => {
  try {
    const response = await fetch(TRANSLATIONS_SHEET_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsed.data || parsed.data.length === 0) {
      throw new Error('Empty translations data');
    }

    // Build translations structure from CSV
    const translations: Translations = {};
    const rows = parsed.data as Record<string, string>[];

    // First row contains language codes as column names
    // First column is the key
    const columns = Object.keys(rows[0]);
    const languages = columns.filter((col) => col.toLowerCase() !== 'key');

    if (languages.length === 0) {
      throw new Error('No language columns found in CSV');
    }

    // Determine default language: 'en' if exists, otherwise first available
    const defaultLanguage = languages.includes('en') ? 'en' : languages[0];

    // Initialize language objects
    languages.forEach((lang) => {
      translations[lang] = {};
    });

    // Populate translations
    rows.forEach((row) => {
      const key = row[columns[0]]?.trim().toLowerCase().replace(/\s+/g, '_');
      if (!key) return;

      languages.forEach((lang) => {
        const value = row[lang]?.trim();
        if (value) {
          translations[lang][key] = value;
        }
      });
    });

    // Merge with fallback for default language only
    const mergedTranslations: Translations = { ...translations };
    if (FALLBACK_TRANSLATIONS[defaultLanguage]) {
      mergedTranslations[defaultLanguage] = {
        ...FALLBACK_TRANSLATIONS[defaultLanguage],
        ...translations[defaultLanguage],
      };
    }

    const result: TranslationsResult = {
      translations: mergedTranslations,
      languages,
      defaultLanguage,
    };

    // Cache the result
    translationsCache = mergedTranslations;
    availableLanguagesCache = languages;
    defaultLanguageCache = defaultLanguage;

    return result;
  } catch (error) {
    console.warn('Failed to load translations from CSV, using fallback:', error);

    // Fallback: extract languages from fallback translations
    const fallbackLanguages = Object.keys(FALLBACK_TRANSLATIONS);
    const fallbackDefault = fallbackLanguages.includes('en') ? 'en' : fallbackLanguages[0] || 'en';

    return {
      translations: FALLBACK_TRANSLATIONS,
      languages: fallbackLanguages,
      defaultLanguage: fallbackDefault,
    };
  }
};

/**
 * Clears the translations cache (useful for testing or forced reload)
 */
export const clearTranslationsCache = (): void => {
  translationsCache = null;
  availableLanguagesCache = null;
  defaultLanguageCache = null;
};

/**
 * Get cached available languages
 */
export const getAvailableLanguages = (): LanguageCode[] | null => {
  return availableLanguagesCache;
};

/**
 * Get cached default language
 */
export const getDefaultLanguage = (): LanguageCode | null => {
  return defaultLanguageCache;
};

/**
 * Validates if a string is a supported language
 * Must be called after fetchTranslations to have up-to-date data
 */
export const isValidLanguage = (lang: string, availableLangs?: LanguageCode[]): boolean => {
  const languages = availableLangs || availableLanguagesCache;
  if (!languages) return false;
  return languages.includes(lang);
};