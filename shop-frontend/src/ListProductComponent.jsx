import React from 'react'

const ListProductComponent = () => {
  const DUMMY_DATA = [
    {
      "id": "K3SR7PBX",
      "name": "27-Inch Curved Computer Monitor",
      "price": {
        "currency": "EUR",
        "amount": 159.99
      },
      "itemsInStock": 24081
    },
    {
      "id": "Q3W43CNC",
      "name": "Dual Monitor Desk Mount",
      "price": {
        "currency": "EUR",
        "amount": 119.90
      },
      "itemsInStock": 1079
    },
    {
      "id": "TTKQ8NJZ",
      "name": "Plastic Sheeting",
      "price": {
        "currency": "EUR",
        "amount": 42.99
      },
      "itemsInStock": 55
    },
    {
      "id": "WM3BPG3E",
      "name": "50ft Led Lights",
      "price": {
        "currency": "EUR",
        "amount": 11.69
      },
      "itemsInStock": 3299
    }
  ]
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
            DUMMY_DATA.map(product =>
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.currency} {product.price.amount}</td>
                  <td>{product.itemsInStock}</td>
                </tr>
            )
          }
          </tbody>
        </table>
      </div>
  )
}
export default ListProductComponent
