import { Action, ActionCreator } from 'redux';

export type SimpleAction = Action<string>;

export type SimpleActionCreator = ActionCreator<SimpleAction>;
