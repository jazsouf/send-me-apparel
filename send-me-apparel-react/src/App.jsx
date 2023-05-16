import "./App.css";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import DrawingListPage from "./pages/DrawingListPage";
import DrawingPage from "./pages/DrawingPage";
import ItemsListPage from "./pages/ItemsListPage";
import ItemPage from "./pages/ItemPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drawings" element={<DrawingListPage />} />
        <Route path="/drawings/:id" element={<DrawingPage />} />
        <Route path="/edit/:id" element={<Create />} />
        <Route path="/items/:drawing" element={<ItemsListPage />} />
        <Route path="/items/:id" element={<ItemPage />} /> {/*nested route*/}
        <Route path="/item/:gender/:id/:drawing" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
