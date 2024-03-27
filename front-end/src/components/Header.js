// Header.js
import React from 'react';
import logo from '../logo.svg'; // Import your logo file
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
            My App
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
