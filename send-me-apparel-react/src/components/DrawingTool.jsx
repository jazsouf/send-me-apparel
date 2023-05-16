import React, { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useNavigate } from "react-router-dom";
import teeShirt from "../assets/t-shirt.svg";
import pen from "../assets/pen.svg";
import eraser from "../assets/eraser.svg";

import axios from "axios";

const DrawingTool = ({ id }) => {
  console.log("drawing id", typeof id === "undefined");
  const initialState = {
    img: "",
    blob: "",
    svg: null,
    color: "#123456",
    bgrColor: "#FFFFFF",
    toolSize: 10,
    saveWithBgr: true,
    isPenActive: true,
    isEraserActive: false,
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
        canvas.current.clearCanvas();
        canvas.current.loadPaths(res.data.blob);
      });
  };

  const handlePenMode = () => {
    canvas.current.eraseMode(false);
    setState({ ...state, isPenActive: true, isEraserActive: false });
  };

  const handleEraserMode = () => {
    canvas.current.eraseMode(true);
    setState({ ...state, isPenActive: false, isEraserActive: true });
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
    <div className="drawing-tool">
      <div className="canvas-wrapper">
        <ReactSketchCanvas
          className="canvas"
          style={{
            border: "0.0625rem dashed #000",
            width: "500px",
            height: "500px",
          }}
          ref={canvas}
          strokeWidth={state.toolSize}
          eraserWidth={state.toolSize}
          strokeColor={state.color}
          canvasColor={state.bgrColor}
        />
        <img className="teeshirt" src={teeShirt}></img>
      </div>
      <div className="buttons-nav">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleUndo}>Undo</button>

        <button onClick={handleExportDrawingData}>
          Finish Drawing and go to select Item
        </button>
      </div>
      <div className="floating-navigation">
        <button
          className={state.isPenActive && `active`}
          onClick={handlePenMode}
        >
          <img src={pen} alt="" />
        </button>
        <button
          className={state.isEraserActive && `active`}
          onClick={handleEraserMode}
        >
          <img src={eraser} alt="" />
        </button>
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
            value={state.toolSize}
            onChange={handleToolSize}
          />
          <label htmlFor="penSize">{state.toolSize}</label>
        </div>
      </div>
      {/* <div>{state.imagePath !== "" && <img src={state.imagePath} />}</div> */}
    </div>
  );
};

export default DrawingTool;
