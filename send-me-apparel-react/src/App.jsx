import "./App.css";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import DrawingList from "./components/DrawingList";
import Drawing from "./components/Drawing";
import ItemsList from "./components/ItemsList";
import Item from "./components/Item";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <ItemsList />
      <Drawing />
    </>
  );
}

export default App;
