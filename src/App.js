import React, { useEffect, useState } from "react";
import getDataFromAPI from "./services/api";
import SearchBar from "./components/SearchBar";
import GamesList from "./components/GamesList";
import GameModal from "./components/GameModal";
import { GamesListContext } from "./contexts/GamesContext";
import DropdownMenu from "./components/DropdownMenu"; // Import the DropdownMenu component

function App({ games, setGames, loading, setLoading, success, setsuccess }) {
  const [query, setQuery] = useState("");
  const [openedGame, setOpenedGame] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("All"); // Initialize selectedGenre

  const getGamesList = async () => {
    setLoading(true);
    const gamesData = await getDataFromAPI();
    setGames(gamesData);
    setLoading(false);
    setsuccess(true);
  };

  useEffect(() => {
    getGamesList();
  });

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredGames = games.filter((game) => {
    if (selectedGenre === "All") {
      return game.title.includes(query);
    } else {
      return game.title.includes(query) && game.genre === selectedGenre;
    }
  });

  const handleGameClick = (game) => {
    setOpenedGame(game);
  };

  const handleCloseModal = () => {
    setOpenedGame(null);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-gray-800 to-slate-900 px-0 py-20">
      <SearchBar onSearch={handleSearch} />
      <DropdownMenu
        genres={[
          "All",
          "MMORPG",
          "Strategy",
          "Battle Royale",
          "Shooter",
          "Sports",
          "Fantasy",
          "Racing",
          "Card",
          "Fighting",
        ]}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />
      <GamesList games={filteredGames} onGameClick={handleGameClick} />
      {openedGame && <GameModal game={openedGame} onHide={handleCloseModal} />}
    </div>
  );
}

export default GamesListContext(App);
