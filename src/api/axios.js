import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost/wordpress/wp-json/wp/v2/'
});