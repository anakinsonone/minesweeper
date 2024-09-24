import { useMemo, useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreModal from "./components/ScoreModal";
import Header from "./components/Header";
import { insertNumbers } from "./components/utils/utils";
import { Game, GameModes } from "./components/utils/types";
import { Button } from "react-bootstrap";

const gameSettings = {
  Easy: {
    columns: 10,
    rows: 8,
    squareSize: 45,
    mines: 10,
  },
  Medium: {
    columns: 18,
    rows: 14,
    squareSize: 30,
    mines: 40,
  },
  Hard: {
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
  const [gameMode, setGameMode] = useState<keyof typeof GameModes>("Medium");
  const [board, setBoard] = useState(() =>
    insertNumbers(gameSettings[gameMode]),
  );
  const [mines, setMines] = useState(gameSettings["Medium"].mines);
  const [flags, setFlags] = useState(gameSettings["Medium"].mines);
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

  const changeGameMode = (gameMode: keyof typeof GameModes) => {
    setGame("on");
    setGameMode(gameMode);
    setBoard(() => insertNumbers(gameSettings[gameMode]));
    setMines(gameSettings[gameMode].mines);
    setFlags(gameSettings[gameMode].mines);
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
          setShow={(val: boolean) => setShowScore(val)}
        />
      )}
      {game !== "on" && !showScore && (
        <Button variant="primary" onClick={resetGame}>
          Try Again
        </Button>
      )}
    </>
  );
}

export default App;
