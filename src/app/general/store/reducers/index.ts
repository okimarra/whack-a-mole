// Modules
import {
  Action,
  MetaReducer,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
} from "@ngrx/store";

// Store - Reducers
import * as GameReducer from "./game.reducer";

export interface AppState {
  game: GameReducer.GameState;
}

export const reducers: ActionReducerMap<AppState> = {
  game: GameReducer.reducer,
};

export function clearState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state: AppState | undefined, action: Action): AppState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [clearState];
