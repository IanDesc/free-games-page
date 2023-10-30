import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownMenu = ({ genres, selectedGenre, onGenreChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (genre) => {
    onGenreChange(genre);
    setIsOpen(false);
  };

  return (
    <Dropdown onToggle={setIsOpen} className="inline-block relative">
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        <span className="mr-1">{selectedGenre}</span>
        {/* <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-6-6h12l-6 6z" />
        </svg> */}
      </Dropdown.Toggle>
      {isOpen && (
        <Dropdown.Menu
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
          show={isOpen}
        >
          {genres.map((genre) => (
            <Dropdown.Item
              key={genre}
              onClick={() => handleSelect(genre)}
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              {genre}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default DropdownMenu;
