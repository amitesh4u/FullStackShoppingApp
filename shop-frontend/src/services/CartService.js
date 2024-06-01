import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/shop/api/v1/carts';

export const getCart = (userId) => axios.get(REST_API_BASE_URL + "/" + userId);

export const addItemToCart = (userId, productId, quantity) => axios.post(REST_API_BASE_URL + "/" + userId + "/line-items?productId=" + productId + "&&quantity=" + quantity);

export const removeItemFromCart = (userId, productId, quantity) => axios.delete(REST_API_BASE_URL + "/" + userId + "/line-items?productId=" + productId + "&&quantity=" + quantity);

export const deleteCart = (userId) => axios.delete(REST_API_BASE_URL + "/" + userId);



