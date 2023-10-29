import "./App.css";
import { useEffect } from "react";
import getDataFromAPI from "./services/api";
import SearchBar from "./components/SearchBar";
import GamesList from "./components/GamesList";
import { useState } from "react";
import GameModal from "./components/GameModal";
import { GamesListContext } from "./contexts/GamesContext";

function App({ games, setGames, loading, setLoading, success, setsuccess }) {
  const [query, setQuery] = useState("");
  const [openedGame, setOpenedGame] = useState(null);

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
    // Filter games based on the search query
  };

  const handleGameClick = (game) => {
    setOpenedGame(game);
  };

  const handleCloseModal = () => {
    setOpenedGame(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <GamesList
        games={games.filter((game) => game.title.includes(query))}
        onGameClick={handleGameClick}
      />
      {openedGame && <GameModal game={openedGame} onHide={handleCloseModal} />}
    </div>
  );
}

export default GamesListContext(App);
