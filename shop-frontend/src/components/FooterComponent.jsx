import React from 'react'
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FooterComponent = () => {
  return (
      <div>
        <footer className="text-light">
          <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/amitesh4u" target="_blank">
                    <FontAwesomeIcon icon={faGithub} style={{
                      padding: '0px',
                      fontSize: '20px',
                      color: "rgb(200, 200, 200)"
                    }}/> /amitesh4u
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"
                     href="https://www.linkedin.com/in/amitesh4u" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} style={{
                      paddingLeft: '0px',
                      fontSize: '20px',
                      color: "rgb(200, 200, 200)"
                    }}/>/amitesh4u
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-lef">
                <li className="nav-item">
                  © {new Date().getFullYear()} Amitesh. All rights reserved.
                </li>
              </ul>
            </div>
          </nav>
        </footer>
      </div>
  )
}
export default FooterComponent
