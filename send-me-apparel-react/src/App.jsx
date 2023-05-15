import "./App.css";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import DrawingListPage from "./components/DrawingList";
import DrawingPage from "./pages/DrawingPage";
import ItemsListPage from "./components/ItemsList";
import ItemPage from "./components/Item";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/drawings" element={<DrawingListPage />} />
        <Route path="/drawings/:id" element={<DrawingPage />} />
        <Route path="/edit/:id" element={<Create />} />
        <Route path="/items/:drawing" element={<ItemsListPage />} />
        <Route path="/items/:id" element={<ItemPage />} /> {/*nested route*/}
        <Route path="/cart/:gender/:id/:drawing" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
