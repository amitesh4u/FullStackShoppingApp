import React, {useEffect, useState} from 'react'
import {getCart} from "../services/CartService.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";

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
                  <td>
                    <div style={{
                      width: '150px',
                      margin: '0px auto'
                    }}>
                      <div className="input-group">
                      <span className="input-group-btn">
                        <button type="button"
                                className="quantity-left-minus btn btn-danger btn-number"
                                data-type="minus" data-field="">
                          <FontAwesomeIcon icon={faMinus}/>
                        </button>
                      </span>
                        <input type="text" id="quantity" name="quantity"
                               className="form-control input-number"
                               value={item.quantity}
                               min="0" max={item.quantity} size="1"/>
                        <span className="input-group-btn">
                        <button type="button"
                                className="quantity-right-plus btn btn-success btn-number"
                                data-type="plus" data-field="">
                          <FontAwesomeIcon icon={faPlus}/>
                        </button>
                      </span>
                      </div>
                    </div>
                  </td>
                  <td>{item.price.currency} {(item.quantity
                      * item.price.amount).toFixed(2)}</td>
                  <td>
                    <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faTrashCan} style={{
                        paddingRight: '5px',
                        fontSize: '20px',
                        color: "rgb(200, 50, 50)"
                      }}/>
                    </a>
                  </td>
                </tr>
            )
          }
          </tbody>
        </table>
        <div>
          <p><b>Total Quantity: {cartItemList.numberOfItems}</b></p>
          <p><b>Total Price: {cartItemList.subTotal?.currency} {cartItemList.subTotal?.amount}</b>
          </p>
        </div>
      </div>
  )
}
export default CartComponent
