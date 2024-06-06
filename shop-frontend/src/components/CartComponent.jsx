import React, {useEffect, useState} from 'react'
import {
  addItemToCart,
  deleteCart,
  getCart,
  removeItemFromCart
} from "../services/CartService.js";
import ConfirmationModalComponent from "./ConfirmationModalComponent.jsx";
import PageHeaderMessageComponent from "./PageHeaderMessageComponent.jsx";
import {useNavigate} from "react-router-dom";
import {handleRestApiError} from "./RestCallErrorHandler.jsx";

const CartComponent = () => {

  /* Page Header message i.e. Success / Failure/ Warning */
  const [pageMessage, setPageMessage] = useState({
    'message': '',
    'type': ''
  });
  const hidePageHeaderMessage = () => setPageMessage({message: '', type: ''})

  /* Page Navigation */
  const navigator = useNavigate();

  function showProductList() {
    navigator('/product');
  }

  /* Data with state */
  const [customerId, setCustomerId] = useState('61157')
  const [cartItemList, setCartItems] = useState([])
  const [emptyCart, setEmptyCart] = useState(false)

  /* Load Data on Page load / On Component mount */
  useEffect(() => {
        console.log("Fetching CartComponent...");
        getCart(customerId)
        .then(response => {
          let data = response.data;
          console.log("Data received " + JSON.stringify(data));
          console.log(data.lineItems.length)
          if (data.lineItems.length === 0) {
            setPageMessage({
              message: "Cart is Empty",
              type: "WARNING"
            })
            setEmptyCart(true)
          } else {
            setCartItems(data)
            setPageMessage({
              message: "Cart details has been fetched successfully",
              type: "SUCCESS"
            })
            setEmptyCart(false)
          }
        })
        .catch(error => handleError(error))
      },
      [])

  /* Common Error handler */
  function handleError(error) {
    let errMessage = handleRestApiError(error);
    setPageMessage({message: errMessage, type: "ERROR"})
  }

  /* Handle Increment/Decrement of Cart Items quantities */
  function handleIncrementItem(e) {
    let datatset = e.target.dataset;
    //console.log("Incrementing Item:" + datatset.productId + "|" + datatset.index);
    const newItemList = [...cartItemList.lineItems];
    let item = newItemList.at(parseInt(datatset.index));
    if (item.quantity === 10) {
      return;
    }
    // //console.log(JSON.stringify(item));
    // item.quantity++;
    // // console.log(JSON.stringify(item));

    addItemToCart(61157, datatset.productId, 1)
    .then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      setCartItems(response.data)
      setPageMessage({
        message: "Cart Item quantity has been increased successfully",
        type: "SUCCESS"
      })
    }).catch(error => handleError(error))

    // // const newItemList = cartItemList.lineItems?.map(item => {
    // //   if (item.productId === datatset.productId) {
    // //     // Return updated item
    // //     return {
    // //       ...item,
    // //       quantity: item.quantity + 1,
    // //     };
    // //   } else {
    // //     return item;
    // //   }
    // // });
    // // console.log("Old list: " + JSON.stringify(cartItemList));
    // // console.log("New list: " + JSON.stringify(newItemList));
    // let newNumberOfItems = cartItemList.numberOfItems + 1;
    // const newAmount = cartItemList.subTotal.amount + item.price.amount;
    // const newCartItemList = {
    //   lineItems: newItemList,
    //   numberOfItems: newNumberOfItems,
    //   subTotal: {...cartItemList.subTotal, amount: newAmount}
    // }
    // //console.log("New list: " + JSON.stringify(newCartItemList));
    // // Re-render with the new array
    // setCartItems(newCartItemList);
  }

  function handleDecrementItem(e) {
    let datatset = e.target.dataset;
    //console.log("Decrementing Item:" + datatset.productId + "|" + datatset.index);

    const newItemList = [...cartItemList.lineItems];

    let item = newItemList.at(parseInt(datatset.index));
    if (item.quantity === 1) {
      return;
    }

    //console.log(JSON.stringify(item));
    item.quantity--;
    // console.log(JSON.stringify(item));

    removeItemFromCart(61157, datatset.productId, 1)
    .then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      setCartItems(response.data)
      setPageMessage({
        message: "Cart Item quantity has been decreased successfully",
        type: "SUCCESS"
      })
    }).catch(error => handleError(error))
  }

  /* Handle Product/Cart deletion with Confirmation modal */
  const [productIdTBD, setProductIdTBD] = useState('')
  const [quantityTBD, setQuantityTBD] = useState('')

  const [productRemovalModalShow, setProductRemovalModalShow] = useState(false);
  const handleProductRemovalModalClose = () => setProductRemovalModalShow(
      false);

  const [cartRemovalModalShow, setCartRemovalModalShow] = useState(false);
  const handleCartRemovalModalClose = () => setCartRemovalModalShow(false);

  const handleRemoveProductConfirmationModalShow = (e) => {
    setProductIdTBD(e.target.dataset.productId);
    setQuantityTBD(e.target.dataset.productQuantity);
    setProductRemovalModalShow(true);
  }

  const handleRemoveCartConfirmationModalShow = () => setCartRemovalModalShow(
      true);

  const handleDeleteItem = () => {
    handleProductRemovalModalClose();
    console.log(productIdTBD + '|' + quantityTBD)
    removeItemFromCart(61157, productIdTBD, quantityTBD)
    .then(response => {
          console.log("Data received " + JSON.stringify(response.data));
          if (response.data.lineItems.length === 0) {
            setPageMessage({
              message: "Cart is Empty",
              type: "WARNING"
            })
            setEmptyCart(true)
          } else {
            setCartItems(response.data)
            setEmptyCart(false)
            setPageMessage({
              message: "Cart Item has been removed successfully",
              type: "SUCCESS"
            })
          }
        }
    ).catch(error => handleError(error))
  }

  const handleDeleteCart = () => {
    handleCartRemovalModalClose();
    console.log("deleting cart: " + customerId)
    deleteCart(customerId).then(response => {
          console.log("Data received " + JSON.stringify(response.data));
          setCartItems([])
          setPageMessage({
            message: "Cart is Empty",
            type: "WARNING"
          })
          setEmptyCart(true)
        }
    ).catch(error => handleError(error));
  }

  return (
      <div>
        {pageMessage.message && <PageHeaderMessageComponent
            message={pageMessage.message}
            type={pageMessage.type}
            hidePageHeaderMessage={hidePageHeaderMessage}/>}

        {emptyCart ?
            <p className="d-flex justify-content-center">
              <button className="btn btn-primary  mt-lg-5"
                      style={{minWidth: '140px'}}
                      onClick={showProductList}>
                Show Products
              </button>
            </p>
            :
            <div className='container table-responsive'>
              <h1 className="text-center">Cart Item List</h1>
              <div className="float-end mb-4">
                <button className="btn btn-primary" type="button"
                        onClick={handleRemoveCartConfirmationModalShow}>Clear
                  Cart
                </button>
              </div>
              <table className="table table-striped">
                <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                  <th></th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {
                  // Need to verify if obj is null or not before calling map
                  // else throws TypeError: Cannot read properties of undefined (reading 'map')
                  cartItemList.lineItems?.map((item, index) =>
                      <tr key={item.productId}>
                        <td>{item.productId}</td>
                        <td>{item.productName}</td>
                        <td>{item.price.currency} {item.price.amount}</td>
                        <td>
                          <div className="input-group">
                            <span className="input-group-btn">
                                <i className="fa-solid fa-minus app-decr-icon"
                                   data-product-id={item.productId}
                                   data-index={index}
                                   onClick={handleDecrementItem}/>
                            </span>
                            <p className="px-3 py-1">{item.quantity}</p>
                            <span className="input-group-btn">
                            <i className="fa-solid fa-plus app-incr-icon"
                               data-product-id={item.productId}
                               data-index={index}
                               onClick={handleIncrementItem}/>
                            </span>
                          </div>
                        </td>
                        <td>{item.price.currency} {(item.quantity
                            * item.price.amount).toFixed(2)}</td>
                        <td>
                    <span title="Remove Product from Cart">
                      <i className="fa-solid fa-trash-can app-trash-icon"
                         data-product-id={item.productId}
                         data-product-quantity={item.quantity}
                         onClick={handleRemoveProductConfirmationModalShow}
                      ></i>
                    </span>
                        </td>
                      </tr>
                  )
                }
                </tbody>
              </table>
              <div>
                <p><b>Total Quantity: {cartItemList.numberOfItems}</b></p>
                <p><b>Total
                  Price: {cartItemList.subTotal?.currency} {cartItemList.subTotal?.amount.toFixed(
                      2)}</b>
                </p>
              </div>
            </div>
        }
        <ConfirmationModalComponent show={productRemovalModalShow}
                                    handleClose={handleProductRemovalModalClose}
                                    title={'Cart Item removal confirmation!'}
                                    body={'Do you really want to remove this Item from Cart?'}
                                    handleConfirmation={handleDeleteItem}/>

        <ConfirmationModalComponent show={cartRemovalModalShow}
                                    handleClose={handleCartRemovalModalClose}
                                    title={'Cart removal confirmation!'}
                                    body={'Do you really want to remove all the items from Cart?'}
                                    handleConfirmation={handleDeleteCart}/>
      </div>

  )
}
export default CartComponent
