import React, { useState, useEffect } from "react";
import axios from "axios";

const Drawing = ({ id }) => {
  const [drawingObject, setDrawingObject] = useState({ id: "noId" });

  useEffect(() => {
    axios
      .get(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${id}`)
      .then((res) => {
        console.log(res);
        setDrawingObject(res.data);
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: drawingObject.svg }} />;
};

export default Drawing;
