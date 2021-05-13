import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Heroes Component] add');
export const decrement = createAction('[Heroes Component] delete');

export const displaySuccess = createAction(
  '[Toastr Notification] Display Success',
  props<{ title: string; description: string }>()
);
export const displayWarning = createAction(
  '[Toastr Notification] Display Warning',
  props<{ title: string; description: string }>()
);
export const displayError = createAction(
  '[Toastr Notification] Display Error',
  props<{ title: string; description: string }>()
);
