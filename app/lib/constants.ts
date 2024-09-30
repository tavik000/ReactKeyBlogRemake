export const homepageURL = 'https://master.d2qyb13wnib5il.amplifyapp.com';
export const keyTwitterId = 'kiikey4';
export const keyName = 'Key Zhao';
export const keyEmail = 'tavik002@gmail.com';

export const cloudName = 'diy3s3seb';

export function GetLanguageName(locale: string) {
  switch (locale) {
    case 'en':
      return 'English';
    case 'ja':
      return '日本語';
    case 'kr':
      return '한국어';
    case 'hk':
      return '繁體中文';
    default:
      return 'English';
  }
}

export function GetLangFromLocale(locale: string) {
  switch (locale) {
    case 'en':
      return 'en';
    case 'ja':
      return 'ja';
    case 'kr':
      return 'kr';
    case 'hk':
      return 'zh-HK';
    default:
      return 'en';
  }
}

export function GetLocaleFromLang(lang: string) {
  switch (lang) {
    case 'en':
      return 'en';
    case 'ja':
      return 'ja';
    case 'kr':
      return 'kr';
    case 'zh-HK':
      return 'hk';
    default:
      return 'en';
  }
}


export const DeviceWidth = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};