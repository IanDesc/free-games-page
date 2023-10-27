import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Search games"
        onChange={handleChange}
      />
    </Form>
  );
};

export default SearchBar;
