export type Cell = {
  isMine: boolean;
  minesNearby: number;
  isHidden: boolean;
  isFlagged: boolean;
  squareSize: number;
};
export type Row = Cell[];
export type BoardType = Row[];
export type Game = "on" | "win" | "loss";
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type GameMode = "easy" | "medium" | "hard";
