import { BoardType, Cell, Row } from "./types";

const myCell: Cell = {
  isMine: false,
  minesNearby: 0,
  isHidden: true,
  isFlagged: false,
};

const generateCoordinates = (): number[] => {
  const row = Math.floor(Math.random() * 10);
  const column = Math.floor(Math.random() * 10);
  return [row, column];
};

const generateEmptyBoard = (): BoardType => {
  const board = Array<Row>(10);
  for (let i = 0; i < board.length; i++) {
    board[i] = Array.from({ length: 10 }, () => ({ ...myCell }));
  }
  return board;
};

const insertMines = (mines: number): BoardType => {
  const board = generateEmptyBoard();
  const mineCoordinates = new Map();
  while (mines > 0) {
    const [first, second] = generateCoordinates();
    if (
      mineCoordinates.has(first) &&
      mineCoordinates.get(first).includes(second)
    ) {
      continue;
    } else if (mineCoordinates.has(first)) {
      const correspondingCoords = mineCoordinates.get(first);
      mineCoordinates.set(first, [...correspondingCoords, second]);
      board[first][second].isMine = true;
      mines--;
    } else {
      mineCoordinates.set(first, [second]);
      board[first][second].isMine = true;
      mines--;
    }
  }
  return board;
};

const countNearbyMines = (board: BoardType, x: number, y: number) => {
  let count = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    if (!(i >= 0 && i < board.length)) continue;
    for (let j = y - 1; j <= y + 1; j++) {
      if (!(j >= 0 && j < board[0].length) || (i === x && j === y)) continue;
      if (board[i][j].isMine) count++;
    }
  }
  return count;
};

export const insertNumbers = (mines: number) => {
  const boardWithMines = insertMines(mines);
  for (let i = 0; i < boardWithMines.length; i++) {
    for (let j = 0; j < boardWithMines[0].length; j++) {
      boardWithMines[i][j].minesNearby = countNearbyMines(boardWithMines, i, j);
    }
  }
  return boardWithMines;
};

const findNeighbours = (board: BoardType, x: number, y: number) => {
  const neighbours = [];
  for (let i = x - 1; i <= x + 1; i++) {
    if (!(i >= 0 && i < board.length)) continue;
    for (let j = y - 1; j <= y + 1; j++) {
      if (!(j >= 0 && j < board[0].length) || (i === x && j === y)) continue;
      if (board[i][j].isHidden) neighbours.push({ x: i, y: j });
    }
  }
  return neighbours;
};

export const revealAdjacentCells = (
  board: BoardType,
  row: number,
  column: number,
): BoardType => {
  board[row][column].isHidden = false;
  const neighbours = findNeighbours(board, row, column);
  for (let i = 0; i < neighbours.length; i++) {
    const { x, y } = neighbours[i];
    if (board[x][y].minesNearby) {
      board[x][y].isHidden = false;
      continue;
    } else {
      revealAdjacentCells(board, x, y);
    }
  }
  return board;
};
