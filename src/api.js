import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-vetsolutions-1.onrender.com/',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
    }
})

export default api
