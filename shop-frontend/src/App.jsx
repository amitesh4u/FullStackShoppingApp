import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import About from "./components/About.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import ProductSearchResultComponent
  from "./components/ProductSearchResultComponent.jsx";
import ContainerComponent from "./components/ContainerComponent.jsx";
import CartComponent from "./components/CartComponent.jsx";
import ListProductComponent from "./components/ListProductComponent.jsx";
import ManageProductComponent from "./components/ManageProductComponent.jsx";

function App() {

  return (
      <>
        <BrowserRouter>
        <HeaderComponent/>
          <Routes>
            <Route path="/" element={<ContainerComponent component={<HomeComponent/>}/>}></Route>
            <Route path="/about" element={<ContainerComponent component={<About/>}/>}></Route>
            <Route path="/product" element={<ContainerComponent component={<ListProductComponent/>}/>}></Route>
            <Route path="/cart" element={<ContainerComponent component={<CartComponent/>}/>}></Route>
            <Route path="/addProduct" element={<ContainerComponent component={<ManageProductComponent/>}/>}></Route>
            <Route path="/updateProduct/:productId" element={<ContainerComponent component={<ManageProductComponent/>}/>}></Route>
            <Route path="/search" element={<ContainerComponent component={<ProductSearchResultComponent/>}/>}></Route>
          </Routes>
        <FooterComponent/>
        </BrowserRouter>
      </>
  )
}

export default App
