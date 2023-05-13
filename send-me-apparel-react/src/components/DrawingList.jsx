import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        const svgString = `${drawing.svg}`;
        console.log(drawing._id);
        return (
          <li key={drawing._id}>
            <Link to={`/drawings/${drawing._id}`}>
              <div dangerouslySetInnerHTML={{ __html: svgString }} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default DrawingList;
