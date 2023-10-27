// import React from "react";
// import { useState } from "react";

// class App extends React.Component {
//   const = [gamesList, setGamesList] = useState();

//   constructor(props) {
//     super(props);
//     this.state = {
//       games: [],
//     };
//   }

//   componentDidMount() {
//     fetch("https://www.freetogame.com/api/games")
//       .then((response) => response.json())
//       .then((data) => this.setState({ games: data }))
//       .catch((error) => console.error("Error:", error));
//   }

//   render() {
//     return (
//       <div>
//         {this.state.games.map((game) => (
//           <div key={game.id}>
//             <h2>{game.title}</h2>
//             <p>{game.genre}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

// export default App;

import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import getData from "./services/api";

function App() {
  const chama = async () => {
    await getData();
  };
  useEffect(() => {
    chama();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
