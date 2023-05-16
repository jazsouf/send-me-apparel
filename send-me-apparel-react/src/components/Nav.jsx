import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Send Me Apparel</Link>
        </li>
        <li>
          <Link to="/cart">Shop Cart</Link>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
