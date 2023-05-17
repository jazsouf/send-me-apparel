import React from "react";
import Nav from "../components/Nav";

function NotFound() {
  return (
    <>
      <Nav />
      <div
        style={{
          position: "absolute",
          marginTop: "25%",
          width: "100%",
          fontSize: "2.5rem",
        }}
      >
        Page not found 😵
      </div>
    </>
  );
}

export default NotFound;
