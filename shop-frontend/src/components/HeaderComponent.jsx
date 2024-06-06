import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

const HeaderComponent = () => {

  const [searchString, setSearchString] = useState('')

  const navigator  = useNavigate();
  function handleProductSearch(e){
    e.preventDefault();
    console.log("Search: " + searchString);
    if(searchString.length < 3){
      return;
    }
    let query = searchString;
    setSearchString('');

    /* Passing param internally as state. No change in URL. Use useLocation to fetch */
    navigator("/search", {state:{query:query}});

    /* Passing param as Query. Appear in URL. Use useSearchParam to fetch */
    //navigator(`/search?query=${query}`);

    /* Passing the param as path. Appear in URL. Use useParam to fetch */
    //navigator(`/search/${query}`);
  }

  return (
      <header className="text-light">
        <nav className="navbar navbar-expand-lg bg-primary"
             data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Shopping Application</a>
            <button className="navbar-toggler collapsed" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link app-nav-link" aria-current="page"
                     href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link app-nav-link" href="/product">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link app-nav-link" href="/cart">Cart</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link app-nav-link" href="/about">About</a>
                </li>
              </ul>
              <form className="d-flex col-5 me-lg-5" role="search">
                <input className="form-control me-2" type="search"
                       placeholder="Search Products (min 3 characters)"
                       value={searchString}
                       required
                       onChange={e => setSearchString(e.target.value)}
                       aria-label="Search"/>
                <button className="btn btn-outline-light" type="submit"
                        onClick={handleProductSearch}>Search
                </button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <a className="nav-link app-nav-link" href="#">
                    <i className="fa-solid fa-user-plus app-signup-icon"></i>
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link app-nav-link" href="#">
                    <i className="fa-solid fa-right-to-bracket app-signin-icon"></i>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link app-nav-link" href="/cart">
                    <i className="fa-solid fa-cart-shopping app-cart-icon"></i>
                    Cart
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
  )
}
export default HeaderComponent
