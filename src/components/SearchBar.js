import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      setError("Insira algo para pesquisar");
    } else {
      setError(""); // Clear any previous error message
      onSearch(query);
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
          />
          <Button onClick={handleSearch}>Search</Button>
        </InputGroup>
      </Form>
      {error && (
        <div
          style={{
            backgroundColor: "yellow",
            border: "2px solid red",
            padding: "8px",
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
