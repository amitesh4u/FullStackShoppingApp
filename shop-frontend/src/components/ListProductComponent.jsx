import React, {useEffect, useState} from 'react'
import {listProducts} from "../services/ProductService.js";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ListProductComponent = () => {
  // const DUMMY_DATA = [
  //   {
  //     "id": "K3SR7PBX",
  //     "name": "26-Inch Curved Computer Monitor",
  //     "price": {
  //       "currency": "EUR",
  //       "amount": 159.99
  //     },
  //     "itemsInStock": 24081
  //   },
  //   {
  //     "id": "Q3W43CNC",
  //     "name": "Dual Monitor Desk Mount",
  //     "price": {
  //       "currency": "EUR",
  //       "amount": 119.90
  //     },
  //     "itemsInStock": 1079
  //   },
  //   {
  //     "id": "TTKQ8NJZ",
  //     "name": "Plastic Sheeting",
  //     "price": {
  //       "currency": "EUR",
  //       "amount": 42.99
  //     },
  //     "itemsInStock": 55
  //   },
  //   {
  //     "id": "WM3BPG3E",
  //     "name": "50ft Led Lights",
  //     "price": {
  //       "currency": "EUR",
  //       "amount": 11.69
  //     },
  //     "itemsInStock": 3299
  //   }
  // ]

  const [productList, setProducts] = useState([])

  useEffect(() => {
        console.log("Fetching Products...");
        listProducts()
        .then(response => {
          console.log("Data received " + JSON.stringify(response.data));
          setProducts(response.data)
        })
        .catch(error => console.log(error))
      },
      [])

  return (
      <div className='container table-responsive'>
        <h1 className="text-center">Products List</h1>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Items in Stock</th>
          </tr>
          </thead>
          <tbody>
          {
            productList.map(product =>
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.currency} {product.price.amount}</td>
                  <td>{product.itemsInStock}</td>
                  <td>
                    <div style={{
                      width: '150px',
                      margin: '0px auto'}}>
                    <div className="input-group">
                    <span className="input-group-btn">
                        <button type="button"
                                className="btn btn-default btn-number"
                                disabled="disabled" data-type="minus"
                                data-field="quant[1]">
                            <FontAwesomeIcon icon={faMinus}/>
                        </button>
                    </span>
                      <input type="text" name="quant[1]"
                             className="form-control input-number" value="1"
                             min="1" max="10"/>
                      <span className="input-group-btn">
                        <button type="button"
                                className="btn btn-default btn-number"
                                data-type="plus" data-field="quant[1]">
                           <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </span>
                    </div>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-primary"
                            type="AddToCart">Add To Cart
                    </button>
                  </td>
                </tr>
            )
          }
          </tbody>
        </table>
      </div>
  )
}
export default ListProductComponent
