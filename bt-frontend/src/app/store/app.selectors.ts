import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectCurrentBand = (state: AppState) => state.currentBand;