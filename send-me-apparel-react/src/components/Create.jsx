import React from "react";
import { useParams } from "react-router-dom";
import DrawingTool from "./DrawingTool";
import Nav from "./Nav";
import DrawingListSlider from "./DrawingListSlider";

function Create() {
  const params = useParams();

  return (
    <div>
      <Nav />
      <div className="drawing-main-wrapper">
      <DrawingTool {...params} />
      <DrawingListSlider
        style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}
      />
      </div>
    </div>
  );
}

export default Create;
