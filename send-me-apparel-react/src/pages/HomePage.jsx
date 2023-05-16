import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Create from "../components/Create";
import DrawingListSlider from "../components/DrawingListSlider";
import DrawingTool from "../components/DrawingTool";
import './DrawingPage.css'



function HomePage() {
  return (
    <div>
      <Nav />
      <div className="drawing-main-wrapper">
      <DrawingTool />
      <DrawingListSlider style={{ display: "flex", flexWrap: "wrap", gap: "1em" }} />
      </div>
      
    </div>
  );
}

export default HomePage;
