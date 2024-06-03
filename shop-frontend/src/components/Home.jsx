import React from 'react'
import ListProductComponent from "./ListProductComponent.jsx";
import CartComponent from "./CartComponent.jsx";

function Home() {
  return (
      <div style={{minHeight: '600px'}}>
        <ListProductComponent/>
        <hr/>
        <CartComponent/>
      </div>
  )
}

export default Home
