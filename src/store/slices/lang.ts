import { createSlice } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';

export type Lang = 'en' | 'de';

const en = {
  welcome: 'Welcome',
  language: 'Language',
  close: 'Close',
  actions: 'Actions',
  openNavigation: 'Open navigation',
  search: 'Search',
  dashboard: 'Dashboard',
  profile: 'Profile',
  toggleLight: 'Toggle light',
  count: 'Count',
  images: 'Images',
  increment: 'Increment',
  decrement: 'Decrement',
  upload: 'Upload',
  store: 'Store',
  list: 'List',
  canvas: 'Canvas',
  signOut: 'Sign out',
  signIn: 'Sign in',
  with: 'with',
  minimum: 'Minimum',
  middle: 'Middle',
  maximum: 'Maximum',
  chooseImages: 'Choose Images',
  chosenImages: 'Chosen Images',
  description: 'Description',
  price: 'Price',
  currency: 'Currency',
  submit: 'Submit',
  scrollToTop: 'Scroll to top',
  textBlock: 'Text Block',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  lists: 'Lists',
  headings: 'Headings',
  bulleted: 'Bulleted',
  or: 'or',
  uploaded: 'Uploaded',
  purchased: 'Purchased',
};

export type Dictionary = typeof en;
export type DictionaryKeys = keyof Dictionary;

export interface LangState {
  lang: Lang;
  langs: Record<Lang, Dictionary>;
}

const initialState: LangState = {
  lang: 'en',
  langs: {
    en,
    de: {
      welcome: 'Willkommen',
      language: 'Sprache',
      close: 'Zumachen',
      actions: 'Aktionen',
      openNavigation: 'Öffnen sie die Navigation',
      search: 'Suche',
      dashboard: 'Instrumententafel',
      profile: 'Profil',
      toggleLight: 'Umschalte Licht',
      count: 'Anzahl',
      images: 'Bilder',
      increment: 'Zuhname',
      decrement: 'Abnahme',
      upload: 'Hochladen',
      store: 'Geschäft',
      list: 'Liste',
      canvas: 'Malerleinwand',
      signOut: 'Ausloggen',
      signIn: 'Einloggen',
      with: 'mit',
      minimum: 'Minimum',
      middle: 'Mitte',
      maximum: 'Maximum',
      chooseImages: 'Bilder Auswähl',
      chosenImages: 'Ausgewählte Bilder',
      description: 'Beschreibung',
      price: 'Preis',
      currency: 'Währung',
      submit: 'Einreichen',
      scrollToTop: 'Oben scrollen',
      textBlock: 'Text Block',
      bold: 'Fett gedruckt',
      italic: 'Kursiv',
      underline: 'Unterstrichen',
      lists: 'Listen',
      headings: 'Überschriften',
      bulleted: 'Aufzählung',
      or: 'oder',
      uploaded: 'Hochgeladen',
      purchased: 'Gekauft',
    },
  },
};

export type CreateSetLang = SliceActionCreator<Lang>;
export type SetLangAction = ReturnType<CreateSetLang>;

const langSlice = createSlice({
  slice: 'lang',
  initialState,
  reducers: {
    set: (langState, { payload: newLang }: SetLangAction) => ({
      ...langState,
      lang: newLang,
    }),
  },
});

export default langSlice.reducer;

export type LangAction = SetLangAction;

export const {
  actions: { set: createSetLang },
  selectors: { getLang: selectLangState },
} = langSlice;

export const selectLang = createSelector(
  selectLangState,
  ({ lang }) => lang,
);

export const selectDictionary = createSelector(
  selectLangState,
  ({ langs, lang }) => langs[lang],
);
