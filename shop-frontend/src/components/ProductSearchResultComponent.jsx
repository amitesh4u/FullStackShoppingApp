import React, {useEffect, useState} from 'react'
import {findProducts} from "../services/ProductService.js";
import {useLocation, useNavigate} from "react-router-dom";
import ProductTable from "./ProductTable.jsx";

const ProductSearchResultComponent = () => {

  const location = useLocation();
  let query = location.state.query;

  //const [searchParams, setSearchParams] = useSearchParams();
  //let query = searchParams.get("query");

  //const {query} = useParams();

  const [productList, setProducts] = useState([])
  const [searchString, setSearchString] = useState(query)

  function searchProducts() {
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
  }

  useEffect(() => {
        searchProducts();
      },
      [])

  const navigator = useNavigate();

  function showAllProducts() {
    navigator('/product');
  }

  function handleProductSearch(e) {
    e.preventDefault();
    searchProducts();
  }

  return (
      <div className='container table-responsive'>
        <h1 className="text-center">Products List</h1>
        <div className="row justify-content-evenly mt-5 mb-lg-5">
                <span className="col-6">
         <button className="btn btn-primary" type="button"
                 onClick={showAllProducts}>Show All Products
          </button>
        </span>
          <span className="col-6">
        <form className="d-flex" role="search">
          <input className="form-control me-2 border-black" type="search"
                 placeholder="Search Products (min 3 characters)"
                 value={searchString}
                 required
                 onChange={e => setSearchString(e.target.value)}
                 aria-label="Search"/>
          <button className="btn btn-primary" type="submit"
                  onClick={handleProductSearch}>Search
          </button>
        </form>
          </span>
        </div>

        <ProductTable productList={productList}
                      setProducts={setProducts}
                      showDeleteProduct={false}
                      showUpdateProduct={false}
        />

      </div>
  )
}
export default ProductSearchResultComponent
