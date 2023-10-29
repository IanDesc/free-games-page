import React, { useState } from "react";
import Card from "react-bootstrap/Card";

const GameCard = ({ game, onGameClick }) => {
  return (
    <Card
      className="bg-slate-800 rounded-md drop-shadow hover:drop-shadow-2xl duration-300 hover:scale-106"
      // transform transition
      onClick={onGameClick}
    >
      <Card.Img variant="top" src={game.thumbnail} className="rounded-t-md" />
      <Card.Body>
        <Card.Title className="my-3 ml-3 font-mono text-md text-white">
          {game.title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
