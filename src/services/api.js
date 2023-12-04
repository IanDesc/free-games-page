import axios from "axios";

const url = "http://localhost:3002";

const getDataFromAPI = async () => {
  const options = {
    method: "GET",
    url: `${url}/game`,
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postRegisterGame = async (obj) => {
  try {
    const response = await axios.post(`${url}/game`, { ...obj });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postLogin = async (obj) => {
  try {
    const response = await axios.post(`${url}/users/login`, { ...obj });
    console.log(response.data);
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
};

export { getDataFromAPI, postRegisterGame, postLogin };
