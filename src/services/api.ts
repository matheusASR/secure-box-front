import axios from "axios";

export const api = axios.create({
    baseURL: "http://secbox.online",
    timeout: 6000
})