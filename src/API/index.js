import axios from "axios";

const API_BASE_URL =
  "http://my-json-server.typicode.com/WhatsLab/code-challenge/";
const API_PRODUCTS = API_BASE_URL + "products";
const API_SINGLE_PRODUCT = API_BASE_URL + "productDetails/";

async function getProducts() {
  try {
    var response = await axios.get(API_PRODUCTS);
    var { status, data } = response;
    if (status == 200) {
      return data || [];
    }
  } catch (error) {
    var errorMessage = JSON.parse(JSON.stringify(error)).message;
    if (errorMessage == "Network Error") {
      return "network_error";
    } else {
      if (errorMessage == "Request failed with status code 404") {
        return "not_found";
      }
    }
    return errorMessage;
  }
}

async function getProduct(id) {
  try {
    var response = await axios.get(API_SINGLE_PRODUCT + id);
    var { status, data } = response;
    if (status == 200) {
      return data || {};
    }
  } catch (error) {
    var errorMessage = JSON.parse(JSON.stringify(error)).message;
    if (errorMessage == "Network Error") {
      return "network_error";
    } else {
      if (errorMessage == "Request failed with status code 404") {
        return "not_found";
      }
    }
    return errorMessage;
  }
}

export { getProducts, getProduct };
