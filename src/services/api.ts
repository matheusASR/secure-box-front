import axios from "axios";

export const api = axios.create({
    baseURL: "https://www.secbox.online/",
    timeout: 6000
})