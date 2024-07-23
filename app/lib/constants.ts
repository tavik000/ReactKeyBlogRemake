export const homepageURL = 'https://master.d2qyb13wnib5il.amplifyapp.com';
export const keyTwitterId = 'kiikey4';
export const keyName = 'Key';

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
