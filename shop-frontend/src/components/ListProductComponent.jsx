import React, {useEffect, useState} from 'react'
import {listProducts} from "../services/ProductService.js";
import {useNavigate} from "react-router-dom";
import ProductTable from "./ProductTable.jsx";

const ListProductComponent = () => {
  // const DUMMY_DATA = [
  //   {
  //     "id": "K3SR7PBX",
  //     "name": "27-Inch Curved Computer Monitor",
  //     "description": "Enjoy big, bold and stunning panoramic views",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 159.99
  //     },
  //     "itemsInStock": 24081
  //   },
  //   {
  //     "id": "Q3W43CNC",
  //     "name": "Dual Monitor Desk Mount",
  //     "description": "Ultra wide and longer arm fits most monitors",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 119.90
  //     },
  //     "itemsInStock": 1079
  //   },
  //   {
  //     "id": "TTKQ8NJZ",
  //     "name": "Plastic Sheeting",
  //     "description": "Clear plastic sheeting, tear-resistant, tough, and durable",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 42.99
  //     },
  //     "itemsInStock": 55
  //   },
  //   {
  //     "id": "WM3BPG3E",
  //     "name": "50ft Led Lights",
  //     "description": "Enough lights to decorate an entire room",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 11.69
  //     },
  //     "itemsInStock": 3299
  //   }
  // ]

  const [productList, setProducts] = useState([])

  useEffect(() => {
        console.log("Fetching Products...");
        listProducts()
        .then(response => {
          console.log("Data received " + JSON.stringify(response.data));
          /* Adding a new Key to store quantity to add to cart */
          let newProductList = response.data.map(item => {
            let outOfStock = item.itemsInStock === 0;
            return {...item, quantity: 0, outOfStock: outOfStock}
          });
          setProducts(newProductList)
        })
        .catch(error => console.log(error))
      },
      [])

  const navigator = useNavigate();

  function addNewProduct() {
    navigator('/addProduct');
  }

  return (
      <div className='container table-responsive'>
        <h1 className="text-center">Products List</h1>
        <div>
          <button className="btn btn-primary" type="button"
                  onClick={addNewProduct}>Add Product
          </button>
        </div>
        <ProductTable productList={productList}
                      setProducts={setProducts}
                      showDeleteProduct={true}
                      showUpdateProduct={true}
        />

      </div>
  )
}
export default ListProductComponent
