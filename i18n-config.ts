export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ja', 'kr', 'zh-HK'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
