import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3004/',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
    }
})

export default api