import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ScoreModal({
  mines,
  game,
  show,
  resetGame,
  setShow,
}: {
  mines: number;
  game: string;
  show: boolean;
  resetGame: (mines: number) => void;
  setShow: (val: boolean) => void;
}) {
  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Body
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {game === "win" ? "You Won!" : "You Lost"}{" "}
        <Button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setShow(!show)}
        ></Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => resetGame(mines)}>
          {game === "win" ? "Play" : "Try"} Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScoreModal;
