import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/shop/products';

export const listProducts = () => axios.get(REST_API_BASE_URL + "/all");