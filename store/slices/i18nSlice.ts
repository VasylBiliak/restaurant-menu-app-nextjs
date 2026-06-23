import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTranslations, Translations, LanguageCode } from '@/app/utils/i18n';

interface I18nState {
  language: LanguageCode;
  languages: LanguageCode[];
  defaultLanguage: LanguageCode;
  translations: Translations;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

const initialState: I18nState = {
  language: 'en',
  languages: ['en'],
  defaultLanguage: 'en',
  translations: {},
  isLoading: false,
  isLoaded: false,
  error: null,
};

// Async thunk to fetch translations
export const loadTranslations = createAsyncThunk(
  'i18n/loadTranslations',
  async () => {
    const result = await fetchTranslations();
    return result;
  }
);

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredLanguage', action.payload);
      }
    },
    initializeLanguage: (state) => {
      // Try to get language from localStorage
      if (typeof window !== 'undefined') {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && state.languages.includes(savedLang)) {
          state.language = savedLang as LanguageCode;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTranslations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTranslations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.translations = action.payload.translations;
        state.languages = action.payload.languages;
        state.defaultLanguage = action.payload.defaultLanguage;
        state.language = action.payload.defaultLanguage;
        
        // Check localStorage for saved language preference
        if (typeof window !== 'undefined') {
          const savedLang = localStorage.getItem('preferredLanguage');
          if (savedLang && state.languages.includes(savedLang)) {
            state.language = savedLang as LanguageCode;
          }
        }
      })
      .addCase(loadTranslations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load translations';
      });
  },
});

// Selectors
export const selectLanguage = (state: { i18n: I18nState }) => state.i18n.language;
export const selectLanguages = (state: { i18n: I18nState }) => state.i18n.languages;
export const selectDefaultLanguage = (state: { i18n: I18nState }) => state.i18n.defaultLanguage;
export const selectTranslations = (state: { i18n: I18nState }) => state.i18n.translations;
export const selectIsLoading = (state: { i18n: I18nState }) => state.i18n.isLoading;
export const selectIsLoaded = (state: { i18n: I18nState }) => state.i18n.isLoaded;
export const selectError = (state: { i18n: I18nState }) => state.i18n.error;

export const { setLanguage, initializeLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;
