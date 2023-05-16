import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomItem from "./CustomItem";

const Cart = () => {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(localCart);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [localStorage]);
  function handleClear() {
    console.log("clearing");
    setCart([]);
    window.localStorage.clear();
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove item</th>
          </tr>
        </thead>
        {console.log("rendered Local cart", localCart)}
        <tbody>
          {localCart.length > 0 &&
            localCart.map(({ item, drawingImg, qte }) => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td>
                    <CustomItem
                      filteredTeeShirt={item}
                      drawingImg={drawingImg}
                    />
                  </td>
                  <td>{qte}</td>
                  <td>{item.price}</td>
                  <td>
                    {Math.round(Number(qte) * Number(item.price) * 100) / 100}
                  </td>
                  <td>
                    <button onClick={handleRemoveItem}>Remove</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button onClick={handleClear}>Clear Cart</button>
      <button>
        <Link to="/">Another One</Link>
      </button>
    </>
  );
};
export default Cart;
