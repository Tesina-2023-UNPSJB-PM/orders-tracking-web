import { createSelector } from "@ngrx/store";
import { AppState } from "../state.model";

export const selectUserLogin = (state: AppState) => state.authenticatedUser;

export const selectToken = createSelector(selectUserLogin, (state) => state.access_token );
