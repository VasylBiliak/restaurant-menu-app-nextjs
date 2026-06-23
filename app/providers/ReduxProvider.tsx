"use client";

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import { loadTranslations } from '@/store/slices/i18nSlice';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load translations on mount
    store.dispatch(loadTranslations());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
