import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://assigment-movies-server.herokuapp.com/movie",
  staticUrl: "https://assigment-movies-server.herokuapp.com/",
});
export default axiosInstance;