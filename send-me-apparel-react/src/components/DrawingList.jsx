import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DrawingList() {
  const [drawingListArr, setDrawingListArr] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  function handleDelete(id) {
    axios
      .delete(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${id}`)
      .then((response) => {
        console.log(response);
        setDeleteCount(deleteCount + 1);
      })
      .catch((error) => console.log(error));
  }
  function getDrawings() {
    axios
      .get("https://ironrest.fly.dev/api/send-me-apparel-drawings")
      .then((res) => {
        console.log(res);
        setDrawingListArr(res.data);
      });
  }

  useEffect(() => {
    getDrawings();
  }, [deleteCount]);

  if (drawingListArr.lenght === 0) {
    return <div>🤑</div>;
  }
  return (
    <ul>
      {drawingListArr.map((drawing) => {
        return (
          <li key={drawing._id}>
            <Link to={`/edit/${drawing._id}`}>
              <div>{drawing.imagePath !== "" && <img src={drawing.img} />}</div>
            </Link>
            <button onClick={() => handleDelete(drawing._id)}>
              Detele Permanently
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default DrawingList;
