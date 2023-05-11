import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/drawings" element={<DrawingList />} />
        <Route path="/drawings/:id" element={<Drawing />} /> {/*nested route*/}
        <Route path="/items" element={<ItemsList />} />
        <Route path="/items/:id" element={<Item />} /> {/*nested route*/}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
