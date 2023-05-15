import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Send Me Apparel</Link>
        </li>
        <li>
          <Link to="/cart">Shop Cart</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
