import 'server-only';

const dictionaries: { [key: string]: () => Promise<any> } = {
  en: () => import('./dictionaries/en.json').then((module) => module.default).catch((error) => console.error("Import failed", error)),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  kr: () => import('./dictionaries/kr.json').then((module) => module.default),
  hk: () => import('./dictionaries/hk.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
