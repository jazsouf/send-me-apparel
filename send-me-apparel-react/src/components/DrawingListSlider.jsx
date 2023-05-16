import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function DrawingList() {
  const [drawingListArr, setDrawingListArr] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);
  const [init, setInit] = useState(false);

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

  if (drawingListArr.lenght === 0) {
    return <div>🤑</div>;
  }

  const [sliderRef] = useKeenSlider();

  useEffect(() => {
    getDrawings();
  }, [deleteCount]);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    init && (
      <div className="drawing-slider">
        {drawingListArr.map((drawing, index) => {
          return (
            <div
              className={`image-container`}
              key={drawing._id}
            >
              <Link to={`/drawings/${drawing._id}`}>
                <div>
                  {drawing.imagePath !== "" && <img src={drawing.img} />}
                </div>
              </Link>
              {/* <button onClick={() => handleDelete(drawing._id)}>
                Detele Permanently
              </button> */}
            </div>
          );
        })}
        {/* <div className="button-wrapper">
          <button>
            <Link to="/drawings">See all drawings</Link>
          </button>
        </div> */}
      </div>
    )
  );
}

export default DrawingList;
