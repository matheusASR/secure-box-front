import axios from "axios";
import { API_BASE_URL, LOCK_API_BASE_URL } from "@env";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000
});

export const api_lock = axios.create({
  baseURL: LOCK_API_BASE_URL,
  timeout: 6000
});
