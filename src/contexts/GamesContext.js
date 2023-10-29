import React, { createContext, useState } from "react";
const GamesContext = createContext();

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState([]);
  const [success, setsuccess] = useState([]);
  return (
    <GamesContext.Provider
      value={{ games, setGames, loading, setLoading, success, setsuccess }}
    >
      {children}
    </GamesContext.Provider>
  );
};

const GamesListContext = (Child) => (props) =>
  (
    <GamesContext.Consumer>
      {(context) => <Child {...props} {...context} />}
    </GamesContext.Consumer>
  );

export { GamesProvider, GamesListContext };
