import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import ListProductComponentContainer
  from "./components/ListProductComponentContainer.jsx";
import CartComponentContainer from "./components/CartComponentContainer.jsx";
import AddProductComponentContainer
  from "./components/AddProductComponentContainer.jsx";

function App() {

  return (
      <>
        <HeaderComponent/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/product" element={<ListProductComponentContainer/>}></Route>
            <Route path="/cart" element={<CartComponentContainer/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/addProduct" element={<AddProductComponentContainer/>}></Route>
          </Routes>
        </BrowserRouter>
        <FooterComponent/>
      </>
  )
}

export default App
