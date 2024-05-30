import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/shop/api/v1/products';

export const listProducts = () => axios.get(REST_API_BASE_URL + "/all");

export const findProducts = (searchString) => axios.get(REST_API_BASE_URL + "?query=" + searchString);