import React, {useState} from 'react'
import {addItemToCart} from "../services/CartService.js";
import {removeProduct} from "../services/ProductService.js";
import {useNavigate} from "react-router-dom";
import ConfirmationModalComponent from "./ConfirmationModalComponent.jsx";

const ProductTable = props => {

  function handleAddToCart(e) {
    let dataset = e.target.dataset;
    let productId = dataset.productId;
    let productQuantity = dataset.productQuantity;
    console.log(
        "Adding Item:" + productId
        + "|" + productQuantity);
    if (productQuantity < 1) {
      return;
    }

    addItemToCart(61157, productId, productQuantity)
    .then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      const newProductList = [...props.productList];
      const product = newProductList.find(
          a => a.id === productId
      );
      product.outOfStock = product.itemsInStock === 0;
      product.quantity = 0;
      props.setProducts(newProductList);
      props.setPageMessage({
        message: "Product has been added to Cart successfully",
        type: "SUCCESS"
      })
    })
    .catch(error => props.handleError(error))
  }

  const navigator = useNavigate();

  function handleUpdateProduct(e) {
    let productId = e.target.dataset.productId;
    console.log("Updating Product:" + productId);

    navigator(`/updateProduct/${productId}`);
  }

  function handleDecrementItem(e) {
    let productId = e.target.dataset.productId;
    console.log("Decrementing Item:" + productId);
    const newProductList = [...props.productList];
    const product = newProductList.find(
        a => a.id === productId
    );
    if (product.quantity === 0) {
      return;
    }
    product.quantity--;
    product.itemsInStock++;
    // Re-render with the new array
    props.setProducts(newProductList);
  }

  function handleIncrementItem(e) {
    let productId = e.target.dataset.productId;
    console.log("Incrementing Item:" + productId);
    const newProductList = [...props.productList];
    const product = newProductList.find(
        a => a.id === productId
    );
    if (product.quantity === 10 || product.itemsInStock === 0) {
      return;
    }
    product.quantity++;
    product.itemsInStock--;

    // Re-render with the new array
    props.setProducts(newProductList);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [productIdTBD, setProductIdTBD] = useState('')

  const handleConfirmationModalShow = (e) => {
    setProductIdTBD(e.target.dataset.productId);
    setShow(true);
  }

  function handleDeleteProduct() {
    console.log("Removing Product:" + productIdTBD)
    handleClose()

    removeProduct(productIdTBD).then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      props.setProducts(props.productList.filter(a =>
          a.id !== productIdTBD))
      props.setPageMessage({
        message: "Product has been removed successfully",
        type: "SUCCESS"
      })
    })
    .catch(error => props.handleError(error))
  }

  return (
      <div>
        <div>
          <table className="table table-striped table-bordered">
            <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Items in Stock</th>
            </tr>
            </thead>
            <tbody>
            {
              props.productList.map((product) =>
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price.currency} {product.price.amount}</td>
                    <td>{product.itemsInStock}</td>
                    <td>
                      {product.outOfStock ?
                          <div className="text-danger">Out Of
                            Stock</div>
                          :
                          <div style={{
                            width: '110px',
                            margin: '0px auto'
                          }}>
                            <div className="input-group">
                            <span className="input-group-btn">
                                <i className="fa-solid fa-minus app-decr-icon"
                                   data-product-id={product.id}
                                   onClick={handleDecrementItem}/>
                            </span>
                              <p className="px-3 py-1">{product.quantity}</p>
                              {/*<input type="text" id="quantity" name="quantity"*/}
                              {/*       className="form-control input-number text-center"*/}
                              {/*       value={product.quantity}*/}
                              {/*       min="1" max="10" size="1"/>*/}
                              <span className="input-group-btn">
                                <i className="fa-solid fa-plus app-incr-icon"
                                   data-product-id={product.id}
                                   onClick={handleIncrementItem}/>
                            </span>
                            </div>
                          </div>
                      }
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary"
                              style={{minWidth: '110px'}}
                              type="AddToCart"
                              data-product-id={product.id}
                              data-product-quantity={product.quantity}
                              onClick={handleAddToCart}
                              disabled={product.outOfStock}
                      >
                        Add To Cart
                      </button>
                    </td>
                    {props.showUpdateProduct &&
                        <td>
                    <span title="Update Product">
                      <i className="fa-solid fa-pen-to-square app-edit-icon"
                         data-product-id={product.id}
                         onClick={handleUpdateProduct}
                      ></i>
                    </span>
                        </td>
                    }
                    {props.showDeleteProduct &&
                        <td>
                    <span title="Remove Product">
                      <i className="fa-solid fa-trash-can app-trash-icon"
                         data-product-id={product.id}
                         onClick={handleConfirmationModalShow}
                      ></i>
                    </span>
                        </td>
                    }
                  </tr>
              )
            }
            </tbody>
          </table>
          <ConfirmationModalComponent show={show} handleClose={handleClose}
                                      title={'Product removal confirmation!'}
                                      body={'Do you really want to remove this Product?'}
                                      handleConfirmation={handleDeleteProduct}/>
        </div>
      </div>
  )
}
export default ProductTable
