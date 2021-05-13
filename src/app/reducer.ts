import { Blockchain } from './final/final.model';
import { Action } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, displaySuccess, displayError, displayWarning } from './counter.actions';
export const initialState = {
  
  MonthlyAdvertisingBudget: 0,PhoneNumber:0, Email:'',
}
const _counterReducer = createReducer(initialState,
  on(increment, state => state),
  on(decrement, state => state ),
  
  on(displaySuccess, state => state),
  on(displayError, state => state),
  on(displayWarning, state => state)
);
export const ADD_COIN = 'ADD_COIN';

export function addCoinReducer(state: Blockchain[] = [], action) {
  switch (action.type) {
    case ADD_COIN:
      return [...state, action.payload];
    default:
      return state;
  }
}
export function counterReducer(state, action) {
  return _counterReducer(state, action);
}