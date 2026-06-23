/**
 * Centralized configuration for Google Sheets data sources
 * 
 * This project uses exactly TWO Google Sheets:
 * 1. Content Sheet - UI text, translations, localization
 * 2. Menu Sheet - Menu items, categories, dish data
 */

export const config = {
  /**
   * Content Sheet URL
   * Used for:
   * - UI text translations
   * - Navigation labels
   * - Button labels
   * - Footer content
   * - General UI translations
   * - Available languages
   * - Currency information
   */
  contentSheetUrl: process.env.NEXT_PUBLIC_CONTENT_SHEET_URL || '',

  /**
   * Menu Sheet URL
   * Used for:
   * - Menu items
   * - Categories
   * - Dish names
   * - Descriptions
   * - Prices
   * - Badges
   * - Images
   */
  menuSheetUrl: process.env.NEXT_PUBLIC_MENU_SHEET_URL || '',
};

/**
 * Validate that required environment variables are set
 */
export const validateConfig = (): void => {
  if (!config.contentSheetUrl) {
    console.warn('NEXT_PUBLIC_CONTENT_SHEET_URL is not set. Using fallback translations.');
  }
  if (!config.menuSheetUrl) {
    console.warn('NEXT_PUBLIC_MENU_SHEET_URL is not set. Using fallback menu data.');
  }
};
