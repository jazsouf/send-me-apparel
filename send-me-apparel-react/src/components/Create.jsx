import React from "react";
import { useParams } from "react-router-dom";
import DrawingTool from "./DrawingTool";
import Nav from "./Nav";

function Create() {
  const params = useParams();

  return (
    <div>
      <Nav />
      <DrawingTool {...params} />
    </div>
  );
}

export default Create;
