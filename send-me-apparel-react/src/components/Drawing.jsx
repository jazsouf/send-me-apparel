import React, { useState, createRef, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Drawing = () => {
  const initialState = {
    some: " ",
    color: "#111111",
    bgrColor: "#EEEEEE",
    penSize: 5,
    eraserSize: 5,
    eraserOn: false,
    otherMode: "Eraser",
    saveWithBgr: true,
  };

  const [state, setState] = useState(initialState);

  const canvas = useRef(null);
  console.log(canvas);

  const selectPenColor = (col) => {
    setState({ ...state, color: col });
  };

  const selectBgrColor = (col) => {
    setState({ ...state, bgrColor: col });
  };

  const selectPenSize = (size) => {
    setState({ ...state, penSize: size });
  };

  const selectEraserSize = (size) => {
    setState({ ...state, eraserSize: size });
  };

  return (
    <div>
      <ReactSketchCanvas
        style={{
          border: "0.0625rem solid #000",
          width: "500px",
          height: "500px",
        }}
        ref={canvas}
        strokeWidth={state.penSize}
        eraserWidth={state.eraserSize}
        strokeColor={state.color}
        canvasColor={state.bgrColor}
      />
      <fieldset>
        <legend>Edit Your Style</legend>
        <button
          onClick={() => {
            canvas.current
              .exportImage("png")
              .then((data) => {
                console.log(data);
                setState({ ...state, some: data });
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Get Image
        </button>
        <button
          onClick={() => {
            canvas.current.eraseMode(!state.eraserOn);
            state.otherMode === "Eraser"
              ? setState({ ...state, eraserOn: true, otherMode: "Pen" })
              : setState({ ...state, eraserOn: false, otherMode: "Eraser" });
          }}
        >
          {state.otherMode}
        </button>
        <button
          onClick={() => {
            setState(initialState);
            canvas.current.eraseMode(false);
            canvas.current.resetCanvas();
          }}
        >
          Reset
        </button>

        <button
          onClick={() => {
            canvas.current.redo();
          }}
        >
          Redo
        </button>
        <button
          onClick={() => {
            canvas.current.undo();
          }}
        >
          Undo
        </button>
        <div>
          <input
            type="color"
            value={state.color}
            onChange={(e) => selectPenColor(e.target.value)}
          />
          <input
            type="color"
            value={state.bgrColor}
            onChange={(e) => selectBgrColor(e.target.value)}
          />
          <input
            type="range"
            min="0"
            max="42"
            value={state.thickness}
            onChange={(e) => selectPenSize(e.target.value)}
          />
          <input
            type="range"
            min="0"
            max="42"
            value={state.thickness}
            onChange={(e) => selectEraserSize(e.target.value)}
          />
        </div>
      </fieldset>
      {state.some !== "" && <img src={state.some} />}
    </div>
  );
};

export default Drawing;
