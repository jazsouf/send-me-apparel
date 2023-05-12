import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import DrawingTool from "./Drawing";
import { Link } from "react-router-dom";

function Create() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Draw and Create</Link>
        </li>
        <li>
          <Link to="/drawings">Browse Existing Drawings</Link>
        </li>
        <li>
          <Link to="/items">See products</Link>
        </li>
        <li>
          <Link to="/cart">Customize product</Link>
        </li>
      </ul>

      <DrawingTool />
    </div>
  );
}

export default Create;
