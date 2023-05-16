import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomItem from "./CustomItem";

const Cart = ({ setTotalItems }) => {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(localCart);

  let total = 0;
  useEffect(() => {
    console.log("setItem", setTotalItems);
    setTotalItems(cart.length);
  }, [cart]);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [localStorage.cart]);
  function handleClear() {
    console.log("clearing");
    setCart([]);
    window.localStorage.clear();
  }
  function getTotal() {
    localCart.map(({ item, drawingImg, qte, selectSize }) => {
      total = total + Math.round(Number(qte) * Number(item.price) * 100) / 100;
    });
    return total;
  }
  function handleRemoveItem(i) {
    const filteredCart = cart.filter((item) => cart.indexOf(item) !== i);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove item</th>
          </tr>
        </thead>
        <tbody className="cartBody">
          {localCart.length > 0 &&
            localCart.map(({ item, drawingImg, qte, selectSize }, i) => {
              return (
                <tr key={i}>
                  <td>
                    <CustomItem
                      filteredTeeShirt={item}
                      drawingImg={drawingImg}
                    />
                  </td>
                  <td>{selectSize}</td>
                  <td>{qte}</td>
                  <td>{item.price}</td>
                  <td>
                    {Math.round(Number(qte) * Number(item.price) * 100) / 100}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleRemoveItem(i);
                      }}
                    >
                      Remove
                    </button>
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
      <div>
        <strong>Total {Math.round(getTotal() * 100) / 100}</strong>{" "}
      </div>
    </>
  );
};
export default Cart;
