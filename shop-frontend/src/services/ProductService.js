import axios from "axios";

const PRODUCT_REST_API_BASE_URL = 'http://localhost:8080/shop/api/v1/products';

export const listProducts = () => axios.get(PRODUCT_REST_API_BASE_URL + "/all");

export const findProducts = (searchString) => axios.get(
    PRODUCT_REST_API_BASE_URL + "?query=" + searchString);

export const addProduct = (name, desc, qty, currency, amount) => axios.post(
    PRODUCT_REST_API_BASE_URL + "?name=" + name + "&desc=" + desc + "&qty=" + qty
    + "&amount=" + amount +
    "&currency=" + currency);

export const removeProduct = (productId) => axios.delete(
    PRODUCT_REST_API_BASE_URL + "?productId=" + productId);