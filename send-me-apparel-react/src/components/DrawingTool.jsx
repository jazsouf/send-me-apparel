import React, { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useNavigate } from "react-router-dom";
import teeShirt from "../assets/t-shirt.svg";
import pen from "../assets/pen.svg";
import eraser from "../assets/eraser.svg";
import strokeWidth from "../assets/stroke-width.svg";

import axios from "axios";

const DrawingTool = ({ id }) => {
  console.log("drawing id", id);
  const navigate = useNavigate();
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
    isInputSizeActive: false,
  };
  const [state, setState] = useState(initialState);

  const canvas = useRef(null);
  const selectPenColor = (col) => {
    setState({ ...state, color: col });
  };

  const selectBgrColor = (col) => {
    setState({ ...state, bgrColor: col });
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
            bgrColor: state.bgrColor,
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

  const handlePenMode = () => {
    setState({ ...state, isPenActive: true, isEraserActive: false });
    canvas.current.eraseMode(false);
  };

  const handleEraserMode = () => {
    setState({ ...state, isPenActive: false, isEraserActive: true });
    canvas.current.eraseMode(true);
  };

  const handleReset = () => {
    setState(initialState);
    canvas.current.clearCanvas();
    canvas.current.eraseMode(false);
  };

  const handleRedo = () => {
    canvas.current.redo();
  };
  const handleUndo = () => {
    canvas.current.undo();
  };

  const handleInputSize = () => {
    setState({ ...state, isInputSizeActive: !state.isInputSizeActive });
  };

  const handlePenColor = (e) => selectPenColor(e.target.value);
  const handleBgrColor = (e) => selectBgrColor(e.target.value);
  const handleToolSize = (e) => selectToolSize(e.target.value);

  const handleImportCanvas = (id) => {
    axios
      .get(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${id}`)
      .then((res) => {
        console.log(res);
        canvas.current.clearCanvas();
        canvas.current.loadPaths(res.data.blob);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    id && handleImportCanvas(id);
  }, [id]);

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

      <div className="buttons-nav validate">
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleExportDrawingData}>Done !</button>
      </div>
      <div className="navWrapper">
        <div className="floating-navigation">
          <button
            className={state.isPenActive ? `active` : undefined}
            onClick={handlePenMode}
          >
            <svg
              width="107"
              height="25"
              viewBox="0 0 107 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.80769 0H0V25H9.80769H13.7308H86.3077V15H86.3078V25C88.77 21.055 92.4936 17.6245 96.7549 16H102V15V9H96.7548C92.4936 7.37555 88.77 3.94502 86.3078 0V10H86.3077V0H13.7308H9.80769Z"
                fill="white"
              />
              <path
                d="M102 10H104.5C105.881 10 107 11.1193 107 12.5V12.5C107 13.8807 105.881 15 104.5 15H102V10Z"
                fill={state.color}
              />
              <rect x="62" width="2" height="25" fill={state.color} />
              <rect x="69" width="2" height="25" fill={state.color} />
            </svg>
          </button>
          <button
            className={state.isEraserActive ? `active` : undefined}
            onClick={handleEraserMode}
          >
            <img src={eraser} alt="" />
          </button>
          <div className="separator-wrapper">
            <div className="separator"></div>
          </div>
          <div className="color-wrapper">
            {/* <label htmlFor="color">Brush Color</label> */}
            <input
              type="color"
              name="color"
              id="color"
              value={state.color}
              onChange={handlePenColor}
            />
            {/* <label htmlFor="bgrColor">Background Color</label> */}
            <input
              className="bgColor"
              type="color"
              name="bgrColor"
              id="bgrColor"
              value={state.bgrColor}
              onChange={handleBgrColor}
            />
            <div
              className={`strokeWidth ${
                state.isInputSizeActive ? "active" : undefined
              }`}
              onClick={handleInputSize}
            >
              <img src={strokeWidth}></img>
            </div>
            <div
              className={`inputSize ${
                state.isInputSizeActive ? "active" : undefined
              }`}
            >
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
        </div>
        <div className="buttons-nav">
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>
      </div>
    </div>
  );
};

export default DrawingTool;
