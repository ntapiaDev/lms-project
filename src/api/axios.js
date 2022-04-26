import axios from "axios";
// const BASE_URL = 'http://decouvertewordpress/wp-json';
const BASE_URL = 'http://ffpa/wp-json/';


export default axios.create({
    baseURL: BASE_URL
});
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9kZWNvdXZlcnRld29yZHByZXNzIiwiaWF0IjoxNjUwODkzNDE0LCJuYmYiOjE2NTA4OTM0MTQsImV4cCI6MTY1MTQ5ODIxNCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMiJ9fX0.pzQayiUanTI9IFLWJ2K7RAESry8mLnrJnBEtLF37nMw'
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mZnBhIiwiaWF0IjoxNjUwODczMjUwLCJuYmYiOjE2NTA4NzMyNTAsImV4cCI6MTY1MTQ3ODA1MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.eG4P2Zic4GKTyt_CcXd6gtO_ddJ0HmHYEtnlVZ-qbAo'
    }
});