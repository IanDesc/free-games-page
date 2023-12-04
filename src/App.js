import React, { useEffect, useState, useMemo } from "react";

import SearchBar from "./components/SearchBar";
import GamesList from "./components/GamesList";
import GameModal from "./components/GameModal";
import { GamesListContext } from "./contexts/GamesContext";
import DropdownMenu from "./components/DropdownMenu";
import logo from "./components/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomPagination from "./components/CustomPagination";
import LoginModal from "./components/LoginModal";
import RegisterGameModal from "./components/RegisterGameModal";
import { getDataFromAPI } from "./services/api";

function App({ games, setGames, loading, setLoading, success, setsuccess }) {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 9;

  const [query, setQuery] = useState("");
  const [openedGame, setOpenedGame] = useState(null);
  const [openedLoginModal, setOpenedLoginModal] = useState(false);
  const [openedRegisterGameModal, setOpenedRegisterGameModal] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const genres = [
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
  ];

  const getGamesList = async () => {
    setLoading(true);
    const gamesData = await getDataFromAPI();
    setGames(gamesData);
    setLoading(false);
    setsuccess(true);
  };

  useEffect(() => {
    getGamesList();
  }, []);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      if (selectedGenre === "All") {
        return game.title.includes(query);
      } else {
        return game.title.includes(query) && game.genre === selectedGenre;
      }
    });
  }, [games, query, selectedGenre]);

  const handleGameClick = (game) => {
    setOpenedGame(game);
  };

  const handleCloseModal = () => {
    setOpenedGame(null);
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const gamesToDisplay = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-gray-800 to-slate-900 px-0 py-20">
      <LoginModal show={openedLoginModal} setShow={setOpenedLoginModal} />
      <RegisterGameModal
        show={openedRegisterGameModal}
        setShow={setOpenedRegisterGameModal}
      />
      <img src={logo} alt="Logo" className="logo" />
      <SearchBar onSearch={handleSearch} />
      <DropdownMenu
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />
      <GamesList games={gamesToDisplay} onGameClick={handleGameClick} />
      {openedGame && <GameModal game={openedGame} onHide={handleCloseModal} />}

      <CustomPagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredGames.length / gamesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default GamesListContext(App);
