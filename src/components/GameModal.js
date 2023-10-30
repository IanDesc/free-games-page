import React from "react";
import { Modal } from "react-bootstrap";

const GameModal = ({ game, onHide }) => {
  return (
    <Modal
      show={game !== null}
      onHide={onHide}
      centered
      backdropClassName="bg-blur"
      className="text-black bg-blur"
    >
      <Modal.Header closeButton className="border-b border-gray-700">
        <Modal.Title className="text-xl font-bold">{game?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <img src={game?.thumbnail} alt={game?.title} />
          <p className="text-black">{game?.publisher}</p>
          <p className="text-black">{game?.short_description}</p>
          <p className="text-black">{game?.platform}</p>
          <p className="text-black">{game?.release_date}</p>
          <p className="text-black">{game?.genre}</p>
          <a
            href={game?.game_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Play
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GameModal;
