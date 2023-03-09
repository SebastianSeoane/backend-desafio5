const { json } = require("express");
const {
  getProducts
} = require("./getProductsJson");


async function getAllProducts(req, res) {
  try {
    const prods = await getProducts();
   
  
    return (prods)
  } catch (error) {
    error
  }
}

module.exports = getAllProducts;