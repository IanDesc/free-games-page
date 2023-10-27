import axios, * as others from "axios";

const baseURL = "https://www.freetogame.com/api/games";
const headers = {
  "Content-Type": "application/json",
};

const options = {
  method: "GET",
  url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
  headers: {
    "X-RapidAPI-Key": "4dc9284038msh57275a77015e748p16d03ajsn1a36a5ea4e06",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

const getData = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default getData;
