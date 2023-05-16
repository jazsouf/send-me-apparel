import React from "react";
import { useParams } from "react-router-dom";
import Drawing from "../components/Drawing";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import './DrawingPage.css'

function DrawingPage() {
  const params = useParams();
  console.log("drawingpage", params);
  return (
    <div>
      <Nav />
      <Drawing {...params} />
      <button>
        <Link to={`/edit/${params.id}`}>Edit Drawing</Link>
      </button>
    </div>
  );
}

export default DrawingPage;
