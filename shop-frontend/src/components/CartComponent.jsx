import React, {useEffect, useState} from 'react'
import {getCart} from "../services/CartService.js";

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
            cartItemList.lineItems?.map(item =>
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.productName}</td>
                  <td>{item.price.currency} {item.price.amount}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price.currency} {(item.quantity * item.price.amount).toFixed(2)}</td>
                </tr>
            )
          }
          </tbody>
        </table>
        <div>
          <p><b>Total Quantity: {cartItemList.numberOfItems}</b></p>
          <p><b>Total Price: {cartItemList.subTotal.currency} {cartItemList.subTotal.amount}</b></p>
        </div>
      </div>
  )
}
export default CartComponent
