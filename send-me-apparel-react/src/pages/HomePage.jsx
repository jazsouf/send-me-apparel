import React from "react";
import Nav from "../components/Nav";
import DrawingListSlider from "../components/DrawingListSlider";
import DrawingTool from "../components/DrawingTool";
import "./DrawingPage.css";

function HomePage() {
  return (
    <div>
      <Nav />
      <div className="drawing-main-wrapper">
        <DrawingTool />
        <DrawingListSlider
          style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}
        />
      </div>
    </div>
  );
}

export default HomePage;
