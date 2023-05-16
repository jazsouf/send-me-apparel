import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

function Nav({ totalItems }) {
  return (
    <header>
      <Link to="/">
        <img src={logo}></img>
      </Link>



          <Link to="/"><img src={logo}></img></Link>

        <div className="counter-wrapper">
          <Link to="/cart"><span>{totalItems || "🛒"}</span></Link>
            
        </div>


    </header>
  );
}

export default Nav;
