import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ScoreModal({
  mines,
  game,
  show,
  resetGame,
}: {
  mines: number;
  game: string;
  show: boolean;
  resetGame: (mines: number) => void;
}) {
  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Body>{game === "win" ? "You Won" : "You Lost"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => resetGame(mines)}>
          {game === "win" ? "Play" : "Try"} Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScoreModal;
