import axios from "axios";

export const api = axios.create({
    baseURL: "https://wwww.secbox.online/",
    timeout: 6000
})