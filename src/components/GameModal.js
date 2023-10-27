import React from "react";
import { Card } from "react-bootstrap";
import { useState } from "react";

const GameModal = ({ game, onGameClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      style={{ width: "18rem" }}
      onClick={() => onGameClick(game)}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      className={`game-card ${hovered ? "hovered" : ""}`}
    >
      <Card.Img variant="top" src={game.thumbnail} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default GameModal;
