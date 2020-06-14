import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../sandpiper-logo.svg';

const Footer = (props) => {

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
              <a href="https://git.generalassemb.ly/judykim-ga/final-project-client" target="_blank">
                <i className="fa fa-github fa-2x fa-inverse"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div> */}

      </div>
    </nav>

  )
}

export default Footer;