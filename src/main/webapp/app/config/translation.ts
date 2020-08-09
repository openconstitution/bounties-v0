import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  al: { name: 'Shqip' },
  'ar-ly': { name: 'العربية', rtl: true },
  hy: { name: 'Հայերեն' },
  by: { name: 'Беларускі' },
  bn: { name: 'বাংলা' },
  bg: { name: 'Български' },
  ca: { name: 'Català' },
  'zh-cn': { name: '中文（简体）' },
  'zh-tw': { name: '繁體中文' },
  cs: { name: 'Český' },
  da: { name: 'Dansk' },
  nl: { name: 'Nederlands' },
  en: { name: 'English' },
  et: { name: 'Eesti' },
  fa: { name: 'فارسی', rtl: true },
  fi: { name: 'Suomi' },
  fr: { name: 'Français' },
  gl: { name: 'Galego' },
  de: { name: 'Deutsch' },
  el: { name: 'Ελληνικά' },
  hi: { name: 'हिंदी' },
  hu: { name: 'Magyar' },
  in: { name: 'Bahasa Indonesia' },
  it: { name: 'Italiano' },
  ja: { name: '日本語' },
  ko: { name: '한국어' },
  mr: { name: 'मराठी' },
  my: { name: 'မြန်မာ' },
  pl: { name: 'Polski' },
  'pt-br': { name: 'Português (Brasil)' },
  'pt-pt': { name: 'Português' },
  ro: { name: 'Română' },
  ru: { name: 'Русский' },
  sk: { name: 'Slovenský' },
  sr: { name: 'Srpski' },
  si: { name: 'සිංහල' },
  es: { name: 'Español' },
  sv: { name: 'Svenska' },
  tr: { name: 'Türkçe' },
  ta: { name: 'தமிழ்' },
  te: { name: 'తెలుగు' },
  th: { name: 'ไทย' },
  ua: { name: 'Українська' },
  'uz-Cyrl-uz': { name: 'Ўзбекча' },
  'uz-Latn-uz': { name: 'O`zbekcha' },
  vi: { name: 'Tiếng Việt' },
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export const isRTL = (lang: string): boolean => languages[lang] && languages[lang].rtl;

export const registerLocale = store => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
