import React, {useEffect, useState} from 'react'
import {listProducts, removeProduct} from "../services/ProductService.js";
import {useNavigate} from "react-router-dom";
import {addItemToCart} from "../services/CartService.js";

const ListProductComponent = () => {
  // const DUMMY_DATA = [
  //   {
  //     "id": "K3SR7PBX",
  //     "name": "27-Inch Curved Computer Monitor",
  //     "description": "Enjoy big, bold and stunning panoramic views",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 159.99
  //     },
  //     "itemsInStock": 24081
  //   },
  //   {
  //     "id": "Q3W43CNC",
  //     "name": "Dual Monitor Desk Mount",
  //     "description": "Ultra wide and longer arm fits most monitors",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 119.90
  //     },
  //     "itemsInStock": 1079
  //   },
  //   {
  //     "id": "TTKQ8NJZ",
  //     "name": "Plastic Sheeting",
  //     "description": "Clear plastic sheeting, tear-resistant, tough, and durable",
  //     "price": {
  //       "currency": "INR",
  //       "amount": 42.99
  //     },
  //     "itemsInStock": 55
  //   },
  //   {
  //     "id": "WM3BPG3E",
  //     "name": "50ft Led Lights",
  //     "description": "Enough lights to decorate an entire room",
  //     "price": {
  //       "currency": "INR",
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
          /* Adding a new Key to store quantity to add to cart */
          let newProductList = response.data.map(item => {
            let outOfStock = item.itemsInStock === 0;
            return {...item, quantity: 0, outOfStock: outOfStock}
          });
          setProducts(newProductList)
        })
        .catch(error => console.log(error))
      },
      [])

  const navigator = useNavigate();

  function addNewProduct() {
    navigator('/addProduct');
  }

  function handleAddToCart(e) {
    let dataset = e.target.dataset;
    let productId = dataset.productId;
    let productQuantity = dataset.productQuantity;
    console.log(
        "Adding Item:" + productId
        + "|" + productQuantity);

    addItemToCart(61157, productId, productQuantity)
    .then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      const newProductList = [...productList];
      const product = newProductList.find(
          a => a.id === productId
      );
      product.outOfStock = product.itemsInStock === 0;
      product.quantity=0;
      setProducts(newProductList);
    })
    .catch(error => console.log(error))
  }

  function handleDeleteProduct(e) {
    let productId = e.target.dataset.productId;
    console.log("Removing Product:" + productId)
    removeProduct(productId).then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      setProducts(productList.filter(a =>
          a.id !== productId))
    })
    .catch(error => console.log(error))
  }

  function handleDecrementItem(e) {
    let productId = e.target.dataset.productId;
    console.log("Decrementing Item:" + productId);
    const newProductList = [...productList];
    const product = newProductList.find(
        a => a.id === productId
    );
    if (product.quantity === 1) {
      return;
    }
    product.quantity--;
    product.itemsInStock++;
    // Re-render with the new array
    setProducts(newProductList);
  }

  function handleIncrementItem(e) {
    let productId = e.target.dataset.productId;
    console.log("Incrementing Item:" + productId);
    const newProductList = [...productList];
    const product = newProductList.find(
        a => a.id === productId
    );
    if (product.quantity === 10 || product.itemsInStock === 0) {
      return;
    }
    product.quantity++;
    product.itemsInStock--;

    // Re-render with the new array
    setProducts(newProductList);
  }

  return (
      <div className='container table-responsive'>
        <h1 className="text-center">Products List</h1>
        <div>
          <button className="btn btn-primary" type="button"
                  onClick={addNewProduct}>Add Product
          </button>
        </div>
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
            productList.map((product) =>
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price.currency} {product.price.amount}</td>
                  <td>{product.itemsInStock}</td>
                  <td>
                    {product.outOfStock ?
                        <div style={{color: 'red', fontWeight: '500'}}>Out Of Stock</div>
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
                  <td style={{minWidth: '110px'}}>
                    <button className="btn btn-sm btn-primary"
                            type="AddToCart"
                            data-product-id={product.id}
                            data-product-quantity={product.quantity}
                            onClick={handleAddToCart}
                            disabled={product.outOfStock}
                            >
                      Add To Cart
                    </button>
                  </td>
                  <td>
                    <span title="Remove Product">
                      <i className="fa-solid fa-trash-can  app-trash-icon"
                         data-product-id={product.id}
                         onClick={handleDeleteProduct}
                      ></i>
                    </span>
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
