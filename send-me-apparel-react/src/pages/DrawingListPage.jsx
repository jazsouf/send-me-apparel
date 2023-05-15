import React from "react";
import DrawingList from "../components/DrawingList";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

function DrawingListPage() {
  return (
    <div>
      <Nav />
      <DrawingList />
    </div>
  );
}

export default DrawingListPage;
