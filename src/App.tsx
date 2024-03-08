import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreModal from "./components/ScoreModal";
import Header from "./components/Header";
import { insertNumbers } from "./components/utils/utils";
import { Game } from "./components/utils/types";

enum GameMode {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

const gameSettings = {
  easy: {
    columns: 10,
    rows: 8,
    squareSize: 45,
    mines: 10,
  },
  medium: {
    columns: 18,
    rows: 14,
    squareSize: 30,
    mines: 40,
  },
  hard: {
    columns: 24,
    rows: 20,
    squareSize: 25,
    mines: 99,
  },
};
enum GameState {
  On = "on",
  Lose = "lose",
  Win = "win",
}

function App() {
  const [game, setGame] = useState<Game>(GameState.On);
  const [gameMode, setGameMode] = useState(GameMode.Medium);
  const [board, setBoard] = useState(() =>
    insertNumbers(gameSettings[gameMode]),
  );
  const [mines, setMines] = useState(gameSettings[GameMode.Medium].mines);
  const [flags, setFlags] = useState(gameSettings[GameMode.Medium].mines);
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

  useEffect(() => {
    if (hiddenCells === mines) {
      setGame("win");
      setShowScore(true);
    }
  }, [hiddenCells, mines]);

  const resetGame = () => {
    const newBoard = insertNumbers(gameSettings[gameMode]);
    setFlags(gameSettings[gameMode].mines);
    setBoard(newBoard);
    setShowScore(false);
    setGame("on");
  };

  const changeGameMode = (gameMode: string) => {
    setGameMode(GameState.On);
    setGameMode(GameMode[gameMode] as any);
    setBoard(() => insertNumbers(gameSettings[gameMode.toLowerCase()]));
    setMines(gameSettings[gameMode.toLowerCase()].mines);
    setFlags(gameSettings[gameMode.toLowerCase()].mines);
  };

  return (
    <>
      <Header
        flags={flags}
        gameMode={gameMode}
        changeGameMode={changeGameMode}
      />
      <Board
        board={board}
        setBoard={setBoard}
        game={game}
        setGame={setGame}
        setShowScore={setShowScore}
        squareSize={gameSettings[gameMode].squareSize}
        gameMode={gameMode}
        setFlags={setFlags}
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
