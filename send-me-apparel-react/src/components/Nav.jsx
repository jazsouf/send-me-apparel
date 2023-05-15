import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Draw and Create</Link>
        </li>
        <li>
          <Link to="/drawings">Browse Drawings</Link>
        </li>
        <li>
          <Link to="/items">Select Product</Link>
        </li>
        <li>
          <Link to="/cart">Customize Your Product</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
