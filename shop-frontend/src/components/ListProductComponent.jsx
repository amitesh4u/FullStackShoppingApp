import React, {useEffect, useState} from 'react'
import {listProducts} from "../services/ProductService.js";
import {useNavigate} from "react-router-dom";
import ProductTable from "./ProductTable.jsx";
import PageHeaderMessageComponent from "./PageHeaderMessageComponent.jsx";
import {handleRestApiError} from "./RestCallErrorHandler.jsx";
import LoaderComponent from "./LoaderComponent.jsx";

const ListProductComponent = () => {

  /* Page Header message i.e. Success / Failure/ Warning */
  const [pageMessage, setPageMessage] = useState({
    'message': '',
    'type': ''
  });
  const hidePageHeaderMessage = () => setPageMessage({message: '', type: ''})


  /* Page Navigation */
  const navigator = useNavigate();

  function addNewProduct() {
    navigator('/addProduct');
  }

  /* Loader */
  const [showLoader, setShowLoader] = useState(false)

  /* Data with state */
  const [productList, setProducts] = useState([])

  /* Load Data on Page load / On Component mount */
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
          setPageMessage({
            message: "Product list has been fetched successfully",
            type: "SUCCESS"
          })
        })
        .catch(error => handleError(error))
      },
      [])

  /* Common Error handler */
  function handleError(error) {
    let errMessage = handleRestApiError(error)
    setPageMessage({message: errMessage, type: "ERROR"})
  }

  return (
      <div>{pageMessage.message && <PageHeaderMessageComponent
          message={pageMessage.message}
          type={pageMessage.type}
          hidePageHeaderMessage={hidePageHeaderMessage}/>}
        <div className='container table-responsive'>
          {showLoader && <LoaderComponent show={{showLoader}}/>}
          <h1 className="text-center mt-3">Products List</h1>
          <div className="float-end mb-3">
            <button className="btn btn-primary" type="button"
                    onClick={addNewProduct}>Add Product
            </button>
          </div>
          <ProductTable productList={productList}
                        setProducts={setProducts}
                        showDeleteProduct={true}
                        showUpdateProduct={true}
                        handleError={handleError}
                        setPageMessage={setPageMessage}
                        setShowLoader={setShowLoader}

          />

        </div>
      </div>
  )
}
export default ListProductComponent
