import React, {useEffect, useState} from 'react'
import {getCart, removeItemFromCart} from "../services/CartService.js";

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

  useEffect(() => {
        console.log("Fetching CartComponent...");
        getCart(61157)
        .then(response => {
          console.log("Data received " + JSON.stringify(response.data));
          setCartItems(response.data)
        })
        .catch(error => console.log(error))
      },
      [])

  function handleDeleteItem(e) {
    let dataset = e.target.dataset;
    console.log(
        "Removing Item:" + dataset.productId
        + "|" + dataset.productQuantity);

    removeItemFromCart(61157, dataset.productId, dataset.productQuantity)
    .then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      setCartItems(response.data)
    })
    .catch(error => console.log(error))
  }

  function handleIncrementItem(e) {
    let datatset = e.target.dataset;
    //console.log("Incrementing Item:" + datatset.productId + "|" + datatset.index);
    const newItemList = [...cartItemList.lineItems];
    let item = newItemList.at(datatset.index);
    if (item.quantity === 10) {
      return;
    }
    //console.log(JSON.stringify(item));
    item.quantity++;
    // console.log(JSON.stringify(item));

    // const newItemList = cartItemList.lineItems?.map(item => {
    //   if (item.productId === datatset.productId) {
    //     // Return updated item
    //     return {
    //       ...item,
    //       quantity: item.quantity + 1,
    //     };
    //   } else {
    //     return item;
    //   }
    // });
    // console.log("Old list: " + JSON.stringify(cartItemList));
    // console.log("New list: " + JSON.stringify(newItemList));
    let newNumberOfItems = cartItemList.numberOfItems + 1;
    const newAmount = cartItemList.subTotal.amount + item.price.amount;
    const newCartItemList = {
      lineItems: newItemList,
      numberOfItems: newNumberOfItems,
      subTotal: {...cartItemList.subTotal, amount: newAmount}
    }
    //console.log("New list: " + JSON.stringify(newCartItemList));
    // Re-render with the new array
    setCartItems(newCartItemList);
  }

  function handleDecrementItem(e) {
    let datatset = e.target.dataset;
    //console.log("Decrementing Item:" + datatset.productId + "|" + datatset.index);

    const newItemList = [...cartItemList.lineItems];

    let item = newItemList.at(datatset.index);
    if (item.quantity === 1) {
      return;
    }

    //console.log(JSON.stringify(item));
    item.quantity--;
    // console.log(JSON.stringify(item));

    // const newItemList = cartItemList.lineItems?.map(item => {
    //   if (item.productId === datatset.productId) {
    //     // Return updated item
    //     return {
    //       ...item,
    //       quantity: item.quantity - 1,
    //     };
    //   } else {
    //     return item;
    //   }
    // });
    // console.log("Old list: " + JSON.stringify(cartItemList));
    // console.log("New list: " + JSON.stringify(newItemList));
    let newNumberOfItems = cartItemList.numberOfItems - 1;
    const newAmount = cartItemList.subTotal.amount - item.price.amount;
    const newCartItemList = {
      lineItems: newItemList,
      numberOfItems: newNumberOfItems,
      subTotal: {...cartItemList.subTotal, amount: newAmount}
    }
    //console.log("New list: " + JSON.stringify(newCartItemList));
    // Re-render with the new array
    setCartItems(newCartItemList);
  }

  let counter = 0;
  return (
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
                         onClick={handleDeleteItem}></i>
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
  )
}
export default CartComponent
