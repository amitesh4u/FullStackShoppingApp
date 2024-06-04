import React from 'react'
import ListProductComponent from "./ListProductComponent.jsx";
import CartComponent from "./CartComponent.jsx";

function Home() {
  return (
      <div>
        <ListProductComponent/>
        <hr/>
        <CartComponent/>
      </div>
  )
}

export default Home
