import React from 'react'
import ListProductComponent from "./ListProductComponent.jsx";
import CartComponent from "./CartComponent.jsx";

function HomeComponent() {
  return (
      <div>
        <ListProductComponent/>
        <hr/>
        <CartComponent/>
      </div>
  )
}

export default HomeComponent
