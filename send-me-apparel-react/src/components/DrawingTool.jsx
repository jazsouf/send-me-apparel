import React, { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const DrawingTool = ({ id }) => {
  console.log("drawing id", typeof id === "undefined");
  const initialState = {
    img: "",
    blob: "",
    svg: null,
    color: "#123456",
    bgrColor: "#FEDCBA",
    toolSize: 10,
    saveWithBgr: true,
  };
  const [state, setState] = useState(initialState);
  const [drawingId, setDrawingId] = useState("");
  const navigate = useNavigate();

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

  const selectToolSize = (size) => {
    setState({ ...state, toolSize: size });
  };

  const handleExportImg = () => {
    return canvas.current.exportImage("png");
  };

  const handleExportSVG = () => {
    return canvas.current.exportSvg();
  };

  const handleExportCanvas = () => {
    return canvas.current.exportPaths();
  };

  const handleExportDrawingData = () => {
    if (typeof id === "undefined") {
      Promise.all([
        handleExportCanvas(),
        handleExportSVG(),
        handleExportImg(),
      ]).then((res) => {
        console.log(res);
        setState({ ...state, blob: res[0], svg: res[1], img: res[2] });
        axios
          .post("https://ironrest.fly.dev/api/send-me-apparel-drawings", {
            blob: res[0],
            svg: res[1],
            img: res[2],
          })
          .then((response) => {
            console.log(response.data.insertedId);

            navigate(`/items/${response.data.insertedId}`);
          })
          .catch((error) => console.log(error));
      });
    } else {
      Promise.all([
        handleExportCanvas(),
        handleExportSVG(),
        handleExportImg(),
      ]).then((res) => {
        console.log(res);
        setState({ ...state, blob: res[0], svg: res[1], img: res[2] });
        axios
          .patch(
            `https://ironrest.fly.dev/api/send-me-apparel-drawings/${id}`,
            {
              blob: res[0],
              svg: res[1],
              img: res[2],
            }
          )
          .then((response) => {
            console.log(response.data.insertedId);

            navigate(`/items/${id}`);
          })
          .catch((error) => console.log(error));
      });
    }
  };

  const handleImportCanvas = (id) => {
    axios
      .get(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${id}`)
      .then((res) => {
        console.log(res);
        canvas.current.loadPaths(res.data.blob);
      });
  };

  const handlePenMode = () => {
    canvas.current.eraseMode(false);
  };

  const handleEraserMode = () => {
    canvas.current.eraseMode(true);
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
  const handleToolSize = (e) => selectToolSize(e.target.value);
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
        strokeWidth={state.toolSize}
        eraserWidth={state.toolSize}
        strokeColor={state.color}
        canvasColor={state.bgrColor}
      />
      <fieldset>
        <legend>Edit Your Style</legend>
        <button onClick={handleExportDrawingData}>
          Finish Drawing and go to select Item
        </button>
        <button onClick={handlePenMode}>Select Brush</button>
        <button onClick={handleEraserMode}>Select Eraser</button>
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
          {/* <button onClick={selectBgrTransparent}>Transparent Background</button> */}
          <input
            type="range"
            name="penSize"
            id="penSize"
            min="0"
            max="42"
            value={state.penSize}
            onChange={handleToolSize}
          />
          <label htmlFor="penSize">{state.toolSize}</label>
        </div>
      </fieldset>
      <div>{state.imagePath !== "" && <img src={state.imagePath} />}</div>
    </div>
  );
};

export default DrawingTool;
