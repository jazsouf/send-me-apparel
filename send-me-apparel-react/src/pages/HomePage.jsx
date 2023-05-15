import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Create from "../components/Create";
import DrawingList from "../components/DrawingList";

function HomePage() {
  return (
    <div>
      <Nav />
      <Create />
      <DrawingList />
      <button>
        <Link to="/drawings">See all drawings</Link>
      </button>
    </div>
  );
}

export default HomePage;
