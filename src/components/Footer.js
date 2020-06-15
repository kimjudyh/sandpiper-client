import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../sandpiper-logo.svg';

const Footer = () => {

  return (
    <nav className="navbar bottom navbar-expand-lg navbar-dark ">
      <div className="container justify-content-center">
        <div className="row">
          {/* Link to about */}
          <div className="col">
            <div className="clickable-icon logo">
            <Link className="nav-link navbar-brand logo" to={"/about"}><img src={logo} alt="Sandpiper logo" /></Link>
            </div>
          </div>
          {/* Link to Github repo */}
          <div className="col justify-content-center">
            <div className="clickable-icon">
              <a href="https://git.generalassemb.ly/judykim-ga/final-project-client" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-github fa-2x fa-inverse" aria-label="link to github repo"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default Footer;