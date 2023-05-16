import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"

function Nav() {
  return (
    <header>


          <Link to="/"><img src={logo}></img></Link>

        <div className="counter-wrapper">
          <Link to="/cart"><span >0</span></Link>
        </div>

    </header>
  );
}

export default Nav;
