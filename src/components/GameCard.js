import React, { useState } from "react";
import Card from "react-bootstrap/Card";

const GameCard = ({ game, onGameClick }) => {
  return (
    <Card
      class="bg-slate-800 rounded-md drop-shadow hover:drop-shadow-2xl transform transition duration-300 hover:scale-110"
      onClick={onGameClick}
    >
      <Card.Img variant="top" src={game.thumbnail} class="rounded-t-md" />
      <Card.Body>
        <Card.Title class="my-3 ml-3 font-mono text-md text-white">
          {game.title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
