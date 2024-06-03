import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping, faSignIn, faUser } from '@fortawesome/free-solid-svg-icons';

const HeaderComponent = () => {
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
                  <a className="nav-link" aria-current="page"
                     href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/product">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">Cart</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search"
                       placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-light" type="submit">Search
                </button>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faSignIn} style={{
                      paddingRight: '5px',
                      fontSize: '20px',
                      color: "rgb(200, 200, 200)"
                    }}/>
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faUser} style={{
                      paddingRight: '5px',
                      fontSize: '20px',
                      color: "rgb(200, 200, 200)"
                    }}/>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} style={{
                      paddingRight: '5px',
                      fontSize: '20px',
                      color: "rgb(200, 200, 200)"
                    }}/>
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
