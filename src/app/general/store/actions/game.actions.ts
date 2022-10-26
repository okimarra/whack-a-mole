// Modules
import { createAction } from "@ngrx/store";

export const startGame = createAction(
  "[Game] - Start Game"
);

export const endGame = createAction(
  "[Game] - End Game"
);

export const addPoint = createAction(
  "[Game] - Add Point"
);

export const subtractPoint = createAction(
  "[Game] - SubtractPoint"
);