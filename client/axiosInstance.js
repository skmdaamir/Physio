import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
  baseURL: API_BASE,
});

export default instance;