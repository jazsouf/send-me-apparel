import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Create from "../components/Create";
import DrawingList from "../components/DrawingList";
import DrawingTool from "../components/DrawingTool";

function HomePage() {
  return (
    <div>
      <Nav />
      <DrawingTool />
      <DrawingList style={{ display: "flex", flexWrap: "wrap", gap: "1em" }} />
      <button>
        <Link to="/drawings">See all drawings</Link>
      </button>
    </div>
  );
}

export default HomePage;
