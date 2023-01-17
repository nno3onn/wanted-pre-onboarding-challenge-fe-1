import axios from "axios";
import { PROPERTIES } from "../config/properties";

const clientApi = axios.create({
  baseURL: PROPERTIES.BASE_URL,
});

export default clientApi;
