import React from "react";

const DropdownMenu = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {selectedGenre}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {genres.map((genre) => (
          <button
            key={genre}
            className="dropdown-item"
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;