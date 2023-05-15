import React from "react";

function CustomItem({ filteredTeeShirt, drawingImg }) {
  return (
    <div>
      {filteredTeeShirt && (
        <div
          className="customWrapper"
          style={{ display: "block", position: "relative" }}
        >
          <img
            src={drawingImg}
            alt=""
            style={{
              position: "absolute",
              width: "25%",
              top: "36%",
              left: "50%",
              transform: "translateX(-50%)",
              mixBlendMode: "multiply",
            }}
          />

          <img src={filteredTeeShirt.image}></img>
        </div>
      )}
    </div>
  );
}

export default CustomItem;
