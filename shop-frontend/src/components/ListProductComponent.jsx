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
  const [noProducts, setNoProducts] = useState(false)


  /* Load Data on Page load / On Component mount */
  useEffect(() => {
        console.log("Fetching Products...");
        listProducts()
        .then(response => {
          let responseData = response.data;
          console.log("Data received " + JSON.stringify(responseData));
          if(responseData.length === 0) {
            setNoProducts(true);
            setPageMessage({
              message: "No Available Products.",
              type: "WARNING"
            })
          }else {
            /* Adding a new Key to store quantity to add to cart */
            let newProductList = responseData.map(item => {
              let outOfStock = item.itemsInStock === 0;
              return {...item, quantity: 0, outOfStock: outOfStock}
            });
            setProducts(newProductList)
            setPageMessage({
              message: "Product list has been fetched successfully",
              type: "SUCCESS"
            })
          }

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
      <div>
        {showLoader && <LoaderComponent show={{showLoader}}/>}

        {pageMessage.message && <PageHeaderMessageComponent
          message={pageMessage.message}
          type={pageMessage.type}
          hidePageHeaderMessage={hidePageHeaderMessage}/>}
        {noProducts ?
            <p className="d-flex justify-content-center">
              <button className="btn btn-primary mt-lg-5"
                      style={{minWidth: '140px'}}
                      onClick={addNewProduct}>
                Add Product
              </button>
            </p>
            :
        <div className='container table-responsive'>
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
                        setNoProducts={setNoProducts}

          />
        </div>
        }
      </div>
  )
}
export default ListProductComponent
