import React, {useEffect, useState} from 'react'
import {
  addProduct,
  findProduct,
  updateProduct
} from "../services/ProductService.js";
import {useNavigate, useParams} from "react-router-dom";

const ManageProductComponent = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('INR')

  const {productId} = useParams();
  console.log("ProductId: " + productId);

  useEffect(() => {
        if (productId) {
          findProduct(productId)
          .then(response => {
            console.log("Data received " + JSON.stringify(response.data));
            let product = response.data;
            setName(product.name);
            setDesc(product.description)
            setQuantity(product.itemsInStock)
            setCurrency(product.price.currency)
            setPrice(product.price.amount)
          })
          .catch(error => console.log(error))
        }
      },
      []
  )

  /* Lambda style */
  const handleProductName = (e) => setName(e.target.value);
  const handleProductDesc = (e) => setDesc(e.target.value);
  const handleProductQty = (e) => setQuantity(e.target.value);

  /* Function style */
  function handleProductCurrency(e) {
    setCurrency(e.target.value);
  }

  function handleProductPrice(e) {
    setPrice(e.target.value);
  }

  function addNewProduct(e) {
    e.preventDefault();
    console.log(
        name + "|" + desc + "|" + quantity + "|" + currency + "|" + price);
    addProduct(name, desc, quantity, currency, price).then(response => {
      console.log("Data received " + JSON.stringify(response.data));
      setName('');
      setDesc('');
      setQuantity('');
      setPrice('');
      setCurrency('INR');
    })
    .catch(error => console.log(error))
  }

  function updateNewProduct(e) {
    e.preventDefault();
    console.log(productId + "|" +
        name + "|" + desc + "|" + quantity + "|" + currency + "|" + price);
    updateProduct(productId, name, desc, quantity, currency, price).then(
        response => {
          console.log("Data received " + JSON.stringify(response.data));
          showProductList();
        })
    .catch(error => console.log(error))
  }

  const navigator = useNavigate();

  function showProductList() {
    navigator('/product');
  }

  return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> {productId ? 'Update'
                : 'Add'} Product</h2>
            <div className="card-body">
              <form onSubmit={productId ? updateNewProduct : addNewProduct}
                    id="Add Product Form">
                <div className="form-group mb-2">
                  <label className="form-label"> Product Name:</label>
                  <input type="text" maxLength="50" required="required"
                         placeholder="Enter Product Name"
                         name="name" value={name}
                         className="form-control"
                         onChange={handleProductName}/>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Product Description:</label>
                  <textarea maxLength="100" rows="2" required="required"
                            placeholder="Enter Product Description"
                            name="desc" value={desc}
                            className="form-control"
                            onChange={handleProductDesc}/>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Number of Items In
                    Stock:</label>
                  <input type="number" min="1" required="required"
                         placeholder="Enter Items in Stock"
                         name="quantity" value={quantity}
                         className="form-control"
                         onChange={handleProductQty}/>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Price:</label>
                  <select className="form-select"
                          aria-label="Currency"
                          name="currency"
                          value={currency}
                          onChange={handleProductCurrency}>
                    <option value="INR">INR</option>
                    <option value="USD" disabled>USD</option>
                    <option value="EUR" disabled>EUR</option>
                  </select>
                  <input type="number" min="1" step=".01"
                         required="required"
                         placeholder="Enter Price"
                         name="price" value={price}
                         className="form-control"
                         onChange={handleProductPrice}/>
                </div>
                <div className="row justify-content-evenly">
                  <span className="col-4">
                    <button className="btn btn-primary"
                            style={{minWidth: '120px'}}
                            type="submit">
                    {productId ? 'Update' : 'Add'} Product
                    </button>
                  </span>
                  <span className="col-4">
                    <button className="btn btn-primary"
                            style={{minWidth: '140px'}}
                            onClick={showProductList}>
                    Show Products
                  </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}
export default ManageProductComponent
