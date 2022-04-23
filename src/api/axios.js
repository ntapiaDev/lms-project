import axios from "axios";
const BASE_URL = 'http://localhost/wordpress/wp-json/';

export default axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3dvcmRwcmVzcyIsImlhdCI6MTY1MDYyNzQ1MSwibmJmIjoxNjUwNjI3NDUxLCJleHAiOjE2NTEyMzIyNTEsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.LOEx1gC6aYjiZo-Di1dFRgEgkytqtS7DjxQi0aeT6fs'
    }
});