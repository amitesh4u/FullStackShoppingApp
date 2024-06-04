import React, {useEffect, useState} from 'react'
import {findProducts} from "../services/ProductService.js";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ProductTable from "./ProductTable.jsx";

const ProductSearchResultComponent = ( {route, navigate} ) => {

  //const location = useLocation();
  //let searchString = location.state.query;

  const [searchParams, setSearchParams] = useSearchParams();
  let searchString = searchParams.get("query");

  const [productList, setProducts] = useState([])

  useEffect(() => {
        console.log("Fetching Products for " + searchString);
        findProducts(searchString)
        .then(response => {
          console.log("Data received " + JSON.stringify(response.data));
          /* Adding a new Key to store quantity to add to cart */
          let newProductList = response.data?.map(item => {
            let outOfStock = item.itemsInStock === 0;
            return {...item, quantity: 0, outOfStock: outOfStock}
          });
          setProducts(newProductList)
        })
        .catch(error => console.log(error))
      },
      [])

  const navigator = useNavigate();

  function showAllProducts() {
    navigator('/product');
  }

  return (
      <div className='container table-responsive'>
        <h1 className="text-center">Products List</h1>
        <div>
          <button className="btn btn-primary" type="button"
                  onClick={showAllProducts}>Show All Products
          </button>
        </div>
        <ProductTable productList={productList}
                      setProducts={setProducts}
                      showDeleteProduct={false}/>

      </div>
  )
}
export default ProductSearchResultComponent
