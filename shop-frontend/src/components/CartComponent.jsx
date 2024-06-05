import React, {useEffect, useState} from 'react'
import {
  addItemToCart,
  getCart,
  removeItemFromCart
} from "../services/CartService.js";
import ConfirmationModalComponent from "./ConfirmationModalComponent.jsx";
import PageHeaderMessageComponent from "./PageHeaderMessageComponent.jsx";
import {useNavigate} from "react-router-dom";

const CartComponent = () => {

  // const DUMMY_CART = {
  //   "lineItems": [
  //     {
  //       "productId": "TTKQ8NJZ",
  //       "productName": "Plastic Sheeting",
  //       "price": {
  //         "currency": "EUR",
  //         "amount": 42.99
  //       },
  //       "quantity": 20
  //     },
  //     {
  //       "productId": "K3SR7PBX",
  //       "productName": "27-Inch Curved Computer Monitor",
  //       "price": {
  //         "currency": "EUR",
  //         "amount": 159.99
  //       },
  //       "quantity": 2
  //     },
  //     {
  //       "productId": "Q3W43CNC",
  //       "productName": "Dual Monitor Desk Mount",
  //       "price": {
  //         "currency": "EUR",
  //         "amount": 119.90
  //       },
  //       "quantity": 1
  //     }
  //   ],
  //   "numberOfItems": 23,
  //   "subTotal": {
  //     "currency": "EUR",
  //     "amount": 1299.68
  //   }
  // }

  const [cartItemList, setCartItems] = useState([])
  const [emptyCart, setEmptyCart] = useState(false)

  {/*} Success / Failure/ Warning */}
  const [pageMessage, setPageMessage] = useState({
    'message': '',
    'type': ''
  });

  useEffect(() => {
        console.log("Fetching CartComponent...");
        getCart(61157)
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

  const [productIdTBD, setProductIdTBD] = useState('')
  const [quantityTBD, setQuantityTBD] = useState('')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleConfirmationModalShow = (e) => {
    setProductIdTBD(e.target.dataset.productId);
    setQuantityTBD(e.target.dataset.productQuantity);
    setShow(true);
  }

  function handleError(error) {
    console.log(error);
    let errCode = error.code;
    let errMessage = "Houston is working on the problem. Please try again later!!";
    if (errCode === 'ERR_NETWORK') {
      errMessage = "Connection Error. Please try again later!!"
    } else if (errCode === 'ERR_BAD_REQUEST') {
      errMessage = error.response.data.errorMessage;
    }
    setPageMessage({message: errMessage, type: "ERROR"})
  }

  const handleDeleteItem = () => {
    handleClose();
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
    ).catch(error => handleError(error)
    )
  }

  const hidePageHeaderMessage = () => setPageMessage({message: '', type: ''})

  const navigator = useNavigate();

  function showProductList() {
    navigator('/product');
  }

  return (
      <div>
        {pageMessage.message && <PageHeaderMessageComponent
            message={pageMessage.message}
            type={pageMessage.type}
            hidePageHeaderMessage={hidePageHeaderMessage}/>}

        {emptyCart ?
            <p className="d-flex justify-content-center mt-lg-5">
              <button className="btn btn-primary"
                      style={{minWidth: '140px'}}
                      onClick={showProductList}>
                Show Products
              </button>
            </p>
            :
            <div className='container table-responsive'>
              <h1 className="text-center">Cart Item List</h1>
              <table className="table table-striped table-bordered">
                <thead>
                <tr>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                </tr>
                </thead>
                <tbody>
                {
                  // Need to verify if obj is null or not before calling map
                  // else throws TypeError: Cannot read properties of undefined (reading 'map')
                  cartItemList.lineItems?.map((item, index) =>
                      <tr key={item.productId}>
                        <td>{item.productId}</td>
                        <td>{item.productName}</td>
                        <td>{item.price.currency} {item.price.amount}</td>
                        <td>
                          <div style={{
                            width: '150px',
                            margin: '0px auto'
                          }}>
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
                          </div>
                        </td>
                        <td>{item.price.currency} {(item.quantity
                            * item.price.amount).toFixed(2)}</td>
                        <td>
                    <span title="Remove Product from Cart">
                      <i className="fa-solid fa-trash-can app-trash-icon"
                         data-product-id={item.productId}
                         data-product-quantity={item.quantity}
                         onClick={handleConfirmationModalShow}
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
        <ConfirmationModalComponent show={show} handleClose={handleClose}
                                    title={'Cart Item removal confirmation!'}
                                    body={'Do you really want to remove this Item from Cart?'}
                                    handleConfirmation={handleDeleteItem}/>
      </div>

  )
}
export default CartComponent
