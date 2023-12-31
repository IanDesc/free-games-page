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
import { getDataFromAPI, getDataFromAPIWithSearch } from "./services/api";
import BannerNewGame from "./components/BannerNewGame";

function App({ games, setGames, loading, setLoading, success, setsuccess }) {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6;

  const [query, setQuery] = useState("");
  const [openedGame, setOpenedGame] = useState(null);
  const [openedLoginModal, setOpenedLoginModal] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);

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

  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      if (games) {
        setFilteredGames(
          games.filter((game) => {
            if (selectedGenre === "All") {
              return game;
            } else {
              return game.genre === selectedGenre;
            }
          })
        );
      }
    } else {
      const func = async () => {
        setLoading(true);
        const gamesData = await getDataFromAPIWithSearch(query);
        setLoading(false);
        setsuccess(true);
        setFilteredGames(gamesData);
      };
      func();
    }
  }, [games, query, selectedGenre]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const [gamesToDisplay, setGamesToDisplay] = useState(
    filteredGames.slice(indexOfFirstGame, indexOfLastGame)
  );

  useEffect(() => {
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    if (filteredGames) {
      setGamesToDisplay(filteredGames.slice(indexOfFirstGame, indexOfLastGame));
    }
  }, [filteredGames, currentPage]);

  const handleGameClick = (game) => {
    setOpenedGame(game);
  };

  const handleCloseModal = () => {
    setOpenedGame(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setBannerVisible(true);
    } else {
      setBannerVisible(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-gradient-to-tr from-gray-800 to-slate-900 px-0 py-20 min-h-screen">
      <div className="flex flex-row justify-around items-center w-full">
        <div className="flex flex-row justify-start items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-12 sm:mr-10 mr-1"
            onClick={() => {
              window.location.reload();
            }}
          />
          <SearchBar onSearch={handleSearch} />
          <DropdownMenu
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
        <LoginModal show={openedLoginModal} setShow={setOpenedLoginModal} />
      </div>
      {bannerVisible ? <BannerNewGame /> : <></>}

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
