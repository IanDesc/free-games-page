import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      setError("Insira algo para pesquisar");
    } else {
      setError(""); 
      if (query !== lastQuery) {
        onSearch(query);
        setLastQuery(query);
        setQuery(""); // Limpa a consulta após a pesquisa
      }
    }
  };

  return (
    <div>
      <Form>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Pesquise um jogo"
            onChange={handleChange}
            value={query}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
          <Button
            onClick={handleSearch}
            className="focus:ring-indigo-500 focus:border-indigo-500 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Search
          </Button>
        </InputGroup>
      </Form>
      {error && (
        <div
          className="bg-yellow-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
