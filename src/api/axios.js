import axios from "axios";

export default axios.create({
    baseURL: 'http://ffpa/?rest_route=/simple-jwt-login/v1/'
});