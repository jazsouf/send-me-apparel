import React, { useState, useEffect } from "react";
import axios from "axios";

function DrawingList() {
  const [drawingListArr, setDrawingListArr] = useState([]);
  useEffect(() => {
    axios
      .get("https://ironrest.fly.dev/api/send-me-apparel-drawings")
      .then((res) => {
        console.log(res);
        setDrawingListArr(res.data);
      });
  }, []);
  if (drawingListArr.lenght === 0) {
    return <div>🤑</div>;
  }
  return (
    <ul>
      {drawingListArr.map((drawing) => {
        console.log(drawing.svg);

        const svgString = `${drawing.svg}`;
        return (
          <li key={drawing._id}>
            <div dangerouslySetInnerHTML={{ __html: svgString }} />
          </li>
        );
      })}
    </ul>
  );
}

export default DrawingList;
