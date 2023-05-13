import React, { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { paths } from "../assets/paths";
import axios from "axios";

const DrawingTool = ({ id }) => {
  console.log(id);
  const initialState = {
    imagePath: "",
    canvasPath: "",
    svgElement: null,
    color: "#123456",
    bgrColor: "#FEDCBA",
    penSize: 5,
    eraserSize: 5,
    eraserOn: false,
    otherMode: "Brush",
    saveWithBgr: true,
  };

  const [state, setState] = useState(initialState);

  const canvas = useRef(null);
  const selectPenColor = (col) => {
    setState({ ...state, color: col });
  };

  const selectBgrColor = (col) => {
    setState({ ...state, bgrColor: col });
  };

  const selectBgrTransparent = () => {
    setState({ ...state, bgrColor: "#00000000" });
  };

  const selectPenSize = (size) => {
    setState({ ...state, penSize: size });
  };

  const selectEraserSize = (size) => {
    setState({ ...state, eraserSize: size });
  };

  const handleExportImg = () => {
    return canvas.current.exportImage("png");
    // .then((imgData) => {
    //   console.log("png", imgData);
    //   setState({ ...state, imagePath: imgData });
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  };

  const handleExportSVG = () => {
    return canvas.current.exportSvg();
    // .then((svg) => {
    //   console.log("svg", svg);
    //   setState({ ...state, svgElement: svg });
    // });
  };

  const handleExportCanvas = () => {
    return canvas.current.exportPaths();

    // // .then((blob) => {
    // //   console.log("blob", blob);
    // //   setState({ ...state, canvasPath: blob });
    // });
  };

  const handleExportDrawingData = () => {
    Promise.all([handleExportCanvas(), handleExportSVG()]).then((res) => {
      console.log(res);
      axios
        .post("https://ironrest.fly.dev/api/send-me-apparel-drawings", {
          svg: res[1],
          blob: res[0],
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    });
  };

  const handleImportCanvas = (id) => {
    console.log("Im here");
    axios
      .get(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${id}`)
      .then((res) => {
        console.log(res);
        canvas.current.loadPaths(res.data.blob);
      });
  };

  const handleToggleMode = () => {
    canvas.current.eraseMode(!state.eraserOn);
    state.otherMode === "Eraser"
      ? setState({ ...state, eraserOn: true, otherMode: "Brush" })
      : setState({ ...state, eraserOn: false, otherMode: "Eraser" });
  };

  const handleReset = () => {
    setState(initialState);
    canvas.current.eraseMode(false);
    canvas.current.resetCanvas();
  };

  const handleRedo = () => {
    canvas.current.redo();
  };

  const handleUndo = () => {
    canvas.current.undo();
  };

  const handlePenColor = (e) => selectPenColor(e.target.value);
  const handleBgrColor = (e) => selectBgrColor(e.target.value);
  const handlePenSize = (e) => selectPenSize(e.target.value);
  const handleEraserSize = (e) => selectEraserSize(e.target.value);
  id && handleImportCanvas(id);
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
        <button onClick={handleExportDrawingData}>Post Image</button>
        <button onClick={handleExportImg}>Get Image</button>
        <button onClick={handleExportSVG}>Export SVG</button>
        <button onClick={handleExportCanvas}>Export Canvas</button>
        {/* <button onClick={handleImportCanvas}>Load Existing Canvas</button> */}
        <button onClick={handleToggleMode}>{state.otherMode}</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleUndo}>Undo</button>
        <div>
          <label htmlFor="color">Brush Color</label>
          <input
            type="color"
            name="color"
            id="color"
            value={state.color}
            onChange={handlePenColor}
          />
          <label htmlFor="bgrColor">Background Color</label>
          <input
            type="color"
            name="bgrColor"
            id="bgrColor"
            value={state.bgrColor}
            onChange={handleBgrColor}
          />
          <button onClick={selectBgrTransparent}>Transparent Background</button>
          <input
            type="range"
            name="penSize"
            id="penSize"
            min="0"
            max="42"
            value={state.penSize}
            onChange={handlePenSize}
          />
          <label htmlFor="penSize">{state.penSize}</label>
          <input
            type="range"
            name="eraserSize"
            id="eraserSize"
            min="0"
            max="42"
            value={state.eraserSize}
            onChange={handleEraserSize}
          />
          <label htmlFor="eraserSize">{state.eraserSize}</label>
        </div>
      </fieldset>
      <div>{state.imagePath !== "" && <img src={state.imagePath} />}</div>
    </div>
  );
};

export default DrawingTool;
