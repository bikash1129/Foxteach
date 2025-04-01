import axios from "axios";



const token = localStorage.getItem("token")
const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_SERVER}`,
    headers:{
        "Authorization":`Bearer ${token}`
    }
})

export default axiosInstance
