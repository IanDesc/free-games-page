import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const GameCard = ({ game }) => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  return (
    <>
      <Card
        style={{ width: "18rem" }}
        onClick={handleShowModal}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className={`game-card ${hovered ? "hovered" : ""}`}
      >
        <Card.Img variant="top" src={game.thumbnail} />
        <Card.Body>
          <Card.Title>{game.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{game.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={game.thumbnail} alt={game.title} />
          <p>{game.short_description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameCard;
