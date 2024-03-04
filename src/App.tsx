import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreModal from "./components/ScoreModal";
import { insertNumbers } from "./components/utils/utils";
import { Game, GameMode } from "./components/utils/types";

function App() {
  const [mines, setMines] = useState<number>(15);
  const [board, setBoard] = useState(insertNumbers(mines));
  const [game, setGame] = useState<Game>("on");
  const [gameMode, setGameMode] = useState<GameMode>("medium");
  const [showScore, setShowScore] = useState(false);

  const hiddenCells = useMemo(() => {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j].isHidden) count++;
      }
    }
    return count;
  }, [board]);
  console.log(hiddenCells);

  useEffect(() => {
    if (hiddenCells === mines) {
      setGame("win");
      setShowScore(true);
    }
  }, [hiddenCells, mines]);

  useEffect(() => {
    if (gameMode === "easy") {
      setMines(10);
      resetGame(10);
    } else if (gameMode === "medium") {
      setMines(15);
      resetGame(15);
    } else {
      setMines(25);
      resetGame(25);
    }
  }, [gameMode]);

  const resetGame = (mines: number) => {
    const newBoard = insertNumbers(mines);
    setBoard(newBoard);
    setShowScore(false);
    setGame("on");
  };

  return (
    <>
      <Board
        board={board}
        setBoard={setBoard}
        game={game}
        setGame={setGame}
        setShowScore={setShowScore}
      />
      {game !== "on" && (
        <ScoreModal
          mines={mines}
          game={game}
          show={showScore}
          resetGame={resetGame}
        />
      )}
    </>
  );
}

export default App;
