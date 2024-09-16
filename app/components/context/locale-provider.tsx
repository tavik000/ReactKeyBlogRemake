'use client';
import { createContext, useState, useContext } from 'react';
import { DictStructure } from '../localization/dict-store';

type LocaleContextProviderProps = {
    children: React.ReactNode;
    inLocale: string;
    inLang: string;
    inDict: any;
};

type LocaleContextType = {
    locale: string;
    lang: string;
    dict: DictStructure;
};

export const LocaleContext = createContext<LocaleContextType>(
    {} as LocaleContextType
);

export function useLocaleContext() {
    return useContext(LocaleContext);
}

export function LocaleProvider({
    children,
    inLocale,
    inLang,
    inDict,
}: LocaleContextProviderProps) {

    const [locale] = useState(inLocale);
    const [lang] = useState(inLang);
    const [dict] = useState(inDict);

    return (
        <LocaleContext.Provider value={{ locale, lang, dict }}>
            {children}
        </LocaleContext.Provider>
    );
}