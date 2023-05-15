import React from "react";
import DrawingList from "../components/DrawingList";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

function DrawingListPage() {
  return (
    <div>
      <Nav />
      <DrawingList />
      {/* <button>
        <Link to="/">Create a design</Link>
      </button> */}
    </div>
  );
}

export default DrawingListPage;
