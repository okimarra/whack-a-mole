// Modules
import { createSelector } from "@ngrx/store";

// Store - Reducers
import { AppState } from "@store/reducers";
import * as GameReducer from "@store/reducers/game.reducer";

export const selectGameState = (state: AppState) => state.game;

export const selectIsFirstGame = createSelector(
  selectGameState,
  (state: GameReducer.GameState) => state.firstGame
);

export const selectGameScore = createSelector(
  selectGameState,
  (state: GameReducer.GameState) => state.score
);

export const selectGameHighestScore = createSelector(
  selectGameState,
  (state: GameReducer.GameState) => state.highestScore
);