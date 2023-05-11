import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

function Create() {
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
  };

  const Canvas = () => {
    return (
      <ReactSketchCanvas
        style={styles}
        width="600"
        height="400"
        strokeWidth={4}
        strokeColor="red"
      />
    );
  };
  return (
    <div>
      <Canvas />
    </div>
  );
}

export default Create;
