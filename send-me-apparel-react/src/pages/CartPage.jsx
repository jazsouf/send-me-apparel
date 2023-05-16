import React, { useState } from "react";
import Nav from "../components/Nav";
import Cart from "../components/Cart";
useState;
function CartPage() {
  const [totalItems, setTotalItems] = useState(0);
  function totalItemsCb(num) {
    setTotalItems(num);
  }

  return (
    <div>
      <Nav totalItems={totalItems} />
      <Cart totalItemsCb={totalItemsCb} />
    </div>
  );
}

export default CartPage;
