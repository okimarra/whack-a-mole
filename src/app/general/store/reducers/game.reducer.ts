// Modules
import { Action, createReducer, on } from "@ngrx/store";

// Actions
import * as GameActions from "@store/actions/game.actions";

export interface GameState {
  firstGame: boolean;

  score: number;
  highestScore: number;
}

export const initialGameState: GameState = {
  firstGame: true,

  score: 0,
  highestScore: 0
};

const gameReducer = createReducer(
  initialGameState,
  on(GameActions.startGame, (state) => ({ ...state, gameTime: 10, firstGame: false })),
  on(GameActions.addPoint, (state) => ({ ...state, score: state.score + 1 })),
  on(GameActions.subtractPoint, (state) => ({ ...state, score: state.score - 1 })),
  on(GameActions.endGame, (state) => ({ ...state, highestScore: state.score > state.highestScore ? state.score : state.highestScore, score: 0 }))
);

export function reducer(
  state: GameState | undefined,
  action: Action
): GameState {
  return gameReducer(state, action);
}
