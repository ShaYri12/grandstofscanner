const languageToLocaleMap: { [key: string]: string } = {
    nl: 'nl-NL',
    en: 'en-US',
  };
  
  export function getLocaleCode(languageCode: string): string {
    return languageToLocaleMap[languageCode] || languageCode;
  }