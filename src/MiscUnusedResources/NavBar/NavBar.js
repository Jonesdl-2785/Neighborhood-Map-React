import React from 'react';
import '../ListDrawer/DrawerToggleBtn';
import './NavBar.css';
import DrawerToggleBtn from '../ListDrawer/DrawerToggleBtn';

const NavBar = props => (
  <header className="navbar">
    <nav className="navigation">
      <div><DrawerToggleBtn /></div>
      <div className="nav_logo"><a href="/">The LOGO</a></div>
      <div className="whitespace" />
      <div className="nav_items">
        <ul>
          <li><a href="/">1</a></li>
          <li><a href="/">2</a></li>
          </ul>
      </div>
    </nav>
  </header>
);


export default NavBar;