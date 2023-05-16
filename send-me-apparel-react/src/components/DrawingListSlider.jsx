import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function DrawingList() {
  const [drawingListArr, setDrawingListArr] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);
  const [init, setInit] = useState(false);

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

  useEffect(() => {
    setInit(true);
  }, []);

  if (drawingListArr.lenght === 0) {
    return <div>🤑</div>;
  }

  return (
    init && (
      <div className="drawing-slider">
        {drawingListArr.map((drawing, index) => {
          return (
            <div className={`image-container`} key={drawing._id}>
              <Link to={`/edit/${drawing._id}`}>
                <div>
                  {drawing.imagePath !== "" && <img src={drawing.img} />}
                </div>
              </Link>
            </div>
          );
        })}
        <div className="button-wrapper">
          <button>
            <Link to="/drawings">See all drawings</Link>
          </button>
        </div>
      </div>
    )
  );
}

export default DrawingList;
