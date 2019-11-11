import { Reducer } from 'redux';
import { createAction, getType } from 'typesafe-actions';
import de from './languages/de.json';
import en from './languages/en.json';

export type Lang = 'en' | 'de';

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
    de,
  },
};

export const createSetLang = createAction(
  'lang/set',
  action => (payload: Lang) => action(payload),
);
export type CreateSetLang = typeof createSetLang;
export type SetLangAction = ReturnType<CreateSetLang>;

export const lang: Reducer<LangState, LangAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case getType(createSetLang):
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};

export type LangAction = SetLangAction;
