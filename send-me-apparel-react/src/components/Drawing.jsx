import React, { createRef, useEffect, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useForm } from "react-hook-form";

function Drawing() {
  const styles = {
    border: "0.1rem solid black",
  };
  const [drawParams, setDrawParams] = useState({
    canvasColor: "white",
    strokeColor: "black",
    strokeWidth: 5,
    eraserWidth: 5,
  });
  const [isEraseMode, setIsEraseMode] = useState(false);
  const [isPenMode, setIsPenMode] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      canvasColor: "white",
      strokeColor: "black",
      strokeWidth: 5,
      eraserWidth: 5,
    },
  });
  const CommandBoard = () => {
    const onSubmit = (data) => {
      console.log(data);
      setDrawParams(data);
    };
    console.log(errors);

    return (
      <fieldset>
        <legend>Drawing Settings</legend>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="canvasColor">Background Color</label>
            <input
              type="color"
              placeholder="Background Color"
              {...register("canvasColor", { required: true, maxLength: 80 })}
            />
            <label htmlFor="strokeColor">Pen Color</label>
            <input
              type="color"
              placeholder="Pen Color"
              {...register("strokeColor", {})}
            />
            <label htmlFor="penWidth">Pen Width</label>
            <select {...register("strokeWidth", { required: true })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="eraserWidth">Eraser Width</label>
            <select {...register("eraserWidth", { required: true })}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <input type="submit" />
          </form>
          <button>Undo Stroke</button>
          <button>Reset Creation</button>
          <button>Import Background Image</button>
          <button>Export Creation with Background</button>
          <button>Export Image</button>
          <button>Export as PNG</button>
        </div>
      </fieldset>
    );
  };
  const Canvas = () => {
    const canvasRef = createRef();

    const handleGetImage = () => {
      canvasRef.current
        .exportImage("png")
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className={styles.canvas}>
        <ReactSketchCanvas
          ref={canvasRef}
          width="800px"
          height="500px"
          canvasColor={drawParams.canvasColor}
          strokeColor={drawParams.strokeColor}
          strokeWidth={drawParams.strokeWidth}
          eraserWidth={drawParams.eraserWidth}
        />
        <button onClick={handleGetImage}>Save Creation</button>
        <label htmlFor="eraseMode">Erase Mode</label>
        <input
          id="eraseMode"
          type="checkbox"
          defaultChecked={isEraseMode}
          onClick={() => {
            canvasRef.current.eraseMode(true);
            setIsPenMode((prev) => !prev);
          }}
        />
        <label htmlFor="penMode">Pen Mode</label>
        <input
          id="penMode"
          defaultChecked={isPenMode}
          type="checkbox"
          onClick={() => {
            canvasRef.current.eraseMode(false);
            setIsEraseMode((prev) => !prev);
          }}
        />
      </div>
    );
  };

  return (
    <div>
      <Canvas />
      <CommandBoard />
    </div>
  );
}

export default Drawing;
