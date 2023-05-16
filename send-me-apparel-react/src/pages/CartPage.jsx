import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Cart from "../components/Cart";
useState;
function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setItems(items);
    }
  }, []);

  return (
    <div>
      <Nav />
      <Cart items={items} />
    </div>
  );
}

export default CartPage;
