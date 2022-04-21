import axios from "axios";

export default axios.create({
    baseURL: 'http://projet-lms-afpa.000webhostapp.com/?rest_route=/simple-jwt-login/v1/'
});