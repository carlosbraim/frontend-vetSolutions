import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-vet-solutions-4tvf.vercel.app/',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': `Bearer ${ sessionStorage.getItem('token') }`
    }
})

export default api
