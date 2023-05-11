import React, { useState, createRef, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { paths } from "../assets/paths";

const Drawing = () => {
  const initialState = {
    imagePath: " ",
    canvasPath: "",
    savePaths: paths,
    svgElement: null,
    color: "#111111",
    bgrColor: "#EEEEEE",
    penSize: 5,
    eraserSize: 5,
    eraserOn: false,
    otherMode: "Brush",
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
                setState({ ...state, imagePath: data });
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
            canvas.current.exportSvg().then((svg) => {
              console.log(svg);
              setState({ ...state, svgElement: svg });
            });
          }}
        >
          Export SVG
        </button>
        <button
          onClick={() => {
            canvas.current.exportPaths().then((path) => {
              console.log(path);
              // setState({ ...state, canvasPath: path });
            });
          }}
        >
          Export Path
        </button>
        <button
          onClick={() => {
            canvas.current.loadPaths(paths[0]);
            // setState({ ...state, canvasPath: path });
          }}
        >
          Load Drawing
        </button>
        <button
          onClick={() => {
            canvas.current.eraseMode(!state.eraserOn);
            state.otherMode === "Eraser"
              ? setState({ ...state, eraserOn: true, otherMode: "Brush" })
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
          <label htmlFor="color">Brush Color</label>
          <input
            type="color"
            name="color"
            id="color"
            value={state.color}
            onChange={(e) => selectPenColor(e.target.value)}
          />
          <label htmlFor="bgrColor">Background Color</label>
          <input
            type="color"
            name="bgrColor"
            id="bgrColor"
            value={state.bgrColor}
            onChange={(e) => selectBgrColor(e.target.value)}
          />
          <input
            type="range"
            name="penSize"
            id="penSize"
            min="0"
            max="42"
            value={state.penSize}
            onChange={(e) => selectPenSize(e.target.value)}
          />
          <label htmlFor="penSize">{state.penSize}</label>
          <input
            type="range"
            name="eraserSize"
            id="eraserSize"
            min="0"
            max="42"
            value={state.eraserSize}
            onChange={(e) => selectEraserSize(e.target.value)}
          />
          <label htmlFor="eraserSize">{state.eraserSize}</label>
        </div>
      </fieldset>
      {state.some !== "" && <img src={state.imagePath} />}
    </div>
  );
};

export default Drawing;
