import { DeviceWidth } from './constants';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const getFormatDateByLocale = (date: Date, lang: string) => {
  if (lang === 'en') {
    return date.toDateString()
      .split(' ')
      .slice(1)
      .join(' ')
      .replace(/(?<=\d) /, ', ')
  }
  if (lang === 'kr') {
    lang = 'ko-KR'
  }
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

type DeviceWidthType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export const getCurrentDeviceWidthType = (width: number): DeviceWidthType => {
  if (width >= DeviceWidth.xxl) {
    return 'xxl';
  }
  if (width >= DeviceWidth.xl) {
    return 'xl';
  }
  if (width >= DeviceWidth.lg) {
    return 'lg';
  }
  if (width >= DeviceWidth.md) {
    return 'md';
  }
  if (width >= DeviceWidth.sm) {
    return 'sm';
  }
  if (width >= DeviceWidth.xs) {
    return 'xs';
  }
  return 'xxs';
};