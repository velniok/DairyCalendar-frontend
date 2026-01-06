import axios from "axios";

const instance = axios.create({
    baseURL: "https://dairy-calendar-backend--mvzxw2.replit.app/api",
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

export default instance