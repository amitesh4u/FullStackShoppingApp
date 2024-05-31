import './App.css'
import ListProductComponent from "./components/ListProductComponent.jsx";
import CartComponent from "./components/CartComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";

function App() {

  return (
    <>
      <HeaderComponent/>
      <ListProductComponent/>
      <CartComponent/>
      <FooterComponent/>
    </>
  )
}

export default App
