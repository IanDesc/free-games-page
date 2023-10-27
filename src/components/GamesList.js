import React from "react";
import GameCard from "./GameCard";

const GamesList = ({ games, onGameClick }) => {
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onGameClick={onGameClick} />
      ))}
    </div>
  );
};

export default GamesList;
