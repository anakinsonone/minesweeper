import "../App.css";
import { BoardType, Game, SetState } from "./utils/types";
import { revealAdjacentCells } from "./utils/utils";

const Board = ({
  board,
  setBoard,
  game,
  setGame,
  setShowScore,
}: {
  board: BoardType;
  setBoard: SetState<BoardType>;
  game: Game;
  setGame: SetState<Game>;
  setShowScore: SetState<boolean>;
}) => {
  const revealMines = () => {
    let newBoard = structuredClone(board);
    newBoard = newBoard.map((row) =>
      row.map((cell) => {
        if (cell.isMine && !cell.isFlagged) return { ...cell, isHidden: false };
        return cell;
      }),
    );
    setBoard(newBoard);
    setGame("loss");
    setShowScore(true);
  };

  const handleLeftClick = (row: number, column: number) => {
    if (game !== "on") return;
    if (board[row][column].isFlagged) return;
    if (board[row][column].isMine) {
      revealMines();
      return;
    }
    let newBoard = structuredClone(board);
    if (!newBoard[row][column].minesNearby) {
      newBoard = revealAdjacentCells(newBoard, row, column);
      setBoard(newBoard);
      return;
    }
    newBoard[row][column].isHidden = false;
    setBoard(newBoard);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    row: number,
    column: number,
  ) => {
    e.preventDefault();
    if (game !== "on") return;
    const newBoard = structuredClone(board);
    newBoard[row][column].isFlagged = !board[row][column].isFlagged;
    setBoard(newBoard);
  };

  return (
    <>
      <></>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                cell.isHidden ? (
                  <td
                    style={{ backgroundColor: "gray" }}
                    key={`${rowIndex}${cellIndex}`}
                    onClick={() => handleLeftClick(rowIndex, cellIndex)}
                    onContextMenu={(e) =>
                      handleRightClick(e, rowIndex, cellIndex)
                    }
                  >
                    {cell.isFlagged ? " 🚩 " : null}
                  </td>
                ) : (
                  <td key={`${rowIndex}${cellIndex}`}>
                    {cell.isMine
                      ? " 💣 "
                      : cell.minesNearby
                        ? `${cell.minesNearby}`
                        : null}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Board;
