import React from "react";
import GameCard from "./GameCard";

const GamesList = ({ games, onGameClick }) => {
  return (
    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-10 ">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onGameClick={onGameClick} />
      ))}
    </div>
  );
};

export default GamesList;
