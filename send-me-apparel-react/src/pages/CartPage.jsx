import React, { useState } from "react";
import Nav from "../components/Nav";
import Cart from "../components/Cart";
useState;
function CartPage() {
  const [totalItems, setTotalItems] = useState(0);
  function totalItemCb(num) {
    setTotalItems(num);
  }

  return (
    <div>
      <Nav totalItems={totalItems} />
      <Cart setTotalItems={totalItemCb} />
    </div>
  );
}

export default CartPage;
