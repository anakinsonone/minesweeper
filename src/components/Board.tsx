import "../App.css";
import { BoardType, Game, SetState } from "./utils/types";
import { revealAdjacentCells } from "./utils/utils";

enum Colors {
  "c1" = "#1976d2",
  "c2" = "#388e3c",
  "c3" = "#d32f2f",
  "c4" = "#7b1fa2",
  "c5" = "#fe8f01",
  "c6" = "#1e3a8a",
  "c7" = "#78350f",
  "c8" = "#831843",
}

const Board = ({
  board,
  setBoard,
  game,
  setGame,
  setShowScore,
  squareSize,
  gameMode,
  setFlags,
}: {
  board: BoardType;
  setBoard: SetState<BoardType>;
  game: Game;
  setGame: SetState<Game>;
  setShowScore: SetState<boolean>;
  squareSize: number;
  gameMode: string;
  setFlags: SetState<number>;
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
    if (newBoard[row][column].isFlagged) setFlags((prevFlags) => prevFlags + 1);
    else setFlags((prevFlags) => prevFlags - 1);
    newBoard[row][column].isFlagged = !board[row][column].isFlagged;
    setBoard(newBoard);
  };

  const getColor = (id: number): Colors => {
    return Colors[("c" + `${id}`) as keyof typeof Colors];
  };

  return (
    <>
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ height: squareSize }}>
              {row.map((cell, cellIndex) =>
                cell.isHidden ? (
                  <td key={`${rowIndex}${cellIndex}`}>
                    <div
                      style={{
                        backgroundColor:
                          (rowIndex + cellIndex) % 2 === 0
                            ? "#aad751"
                            : "#a2d149",
                        width: squareSize,
                        height: squareSize,
                      }}
                      onClick={() => handleLeftClick(rowIndex, cellIndex)}
                      onContextMenu={(
                        e: React.MouseEvent<
                          HTMLTableDataCellElement,
                          MouseEvent
                        >,
                      ) => handleRightClick(e, rowIndex, cellIndex)}
                    >
                      {cell.isFlagged ? (
                        <div className="image-container">
                          <img
                            src="flag.png"
                            width={squareSize - 10}
                            height={squareSize - 10}
                            alt="flag"
                          />
                        </div>
                      ) : null}
                    </div>
                  </td>
                ) : (
                  <td key={`${rowIndex}${cellIndex}`}>
                    <div
                      onContextMenu={(e) => e.preventDefault()}
                      style={{
                        backgroundColor:
                          (rowIndex + cellIndex) % 2 === 0
                            ? "#e5c29f"
                            : "#d7b899",
                        width: squareSize,
                        height: squareSize,
                        color: getColor(cell.minesNearby),
                        fontSize:
                          gameMode === "easy"
                            ? 30
                            : gameMode === "medium"
                              ? 22
                              : 18,
                        transition: "background-color 1.5s fade-in",
                        fontWeight: "bold",
                      }}
                    >
                      {cell.isMine ? (
                        <div className="image-container mine-container">
                          <img
                            src="mine.png"
                            width={squareSize - 10}
                            height={squareSize - 10}
                            alt="mine"
                          />
                        </div>
                      ) : cell.minesNearby ? (
                        <div className="image-container">
                          {cell.minesNearby}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
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
