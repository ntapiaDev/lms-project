import axios from "axios";
// const BASE_URL = 'http://localhost/wordpress/wp-json/';
const BASE_URL = 'http://ffpa/wp-json/';

export default axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3dvcmRwcmVzcyIsImlhdCI6MTY1MDYyNzQ1MSwibmJmIjoxNjUwNjI3NDUxLCJleHAiOjE2NTEyMzIyNTEsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.LOEx1gC6aYjiZo-Di1dFRgEgkytqtS7DjxQi0aeT6fs'
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mZnBhIiwiaWF0IjoxNjUwODczMjUwLCJuYmYiOjE2NTA4NzMyNTAsImV4cCI6MTY1MTQ3ODA1MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.eG4P2Zic4GKTyt_CcXd6gtO_ddJ0HmHYEtnlVZ-qbAo'
    }
});