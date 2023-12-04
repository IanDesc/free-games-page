import axios from "axios";

const options = {
  method: "GET",
  url: "http://localhost:3002/game",  // Ajuste o URL conforme necessário para a rota específica no seu backend
};

const getDataFromAPI = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getDataFromAPI;
