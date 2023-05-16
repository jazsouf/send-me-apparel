import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomItem from "./CustomItem";
import "./cart.css";
const Cart = () => {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(localCart);
  let total = 0;
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
      total += Math.round(Number(qte) * Number(item.price) * 100) / 100;
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
      {/* <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Remove item</th>
          </tr>
        </thead> */}
      <div className="cart-wrapper">
        <div className="cartBody">
          <div>
            <h1>Shopping Cart</h1>
            <h3>You've 3 Items</h3>
          </div>
          {localCart.length > 0 &&
            localCart.map(({ item, drawingImg, qte, selectSize }, i) => {
              return (
                <div className="cart-el" key={i}>
                  <div className="image-wrapper">
                    <CustomItem
                      filteredTeeShirt={item}
                      drawingImg={drawingImg}
                    />
                  </div>
                  <div className="el-details">
                    <div className="size">Size: {selectSize}</div>
                    <div className="quantity">Quantity: {qte}</div>
                    <div className="item-price">${item.price}</div>
                    <div className="item-total">
                      Total:
                      {Math.round(Number(qte) * Number(item.price) * 100) / 100}
                      $
                    </div>
                    <div className="remove-button-wrapper">
                      <button
                        onClick={() => {
                          handleRemoveItem(i);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div class="floating-cart">
        <button onClick={handleClear}>Clear Cart</button>
        <button>
          <Link to="/">Add another Item</Link>
        </button>
        <div>
          <strong>Total {getTotal()}$</strong>{" "}
        </div>
      </div>
    </>
  );
};
export default Cart;
