import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomItem from "./CustomItem";
import "./cart.css";

const Cart = ({ totalItemsCb }) => {
  const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(localCart);

  let total = 0;
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [localStorage.cart]);
  useEffect(() => {
    totalItemsCb(cart ? cart.length : 0);
  }, [cart]);
  function handleClear() {
    console.log("clearing");
    localStorage.clear();
    console.log(localCart);
    console.log(cart);
  }
  function getTotal() {
    localCart.map(({ item, drawingImg, qte, selectSize }) => {
      total = total + Math.round(Number(qte) * Number(item.price) * 100) / 100;
    });
    return Math.round(total * 100) / 100;
  }
  function handleRemoveItem(i) {
    const filteredCart = cart.filter((item) => cart.indexOf(item) !== i);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  }
  return (
    <>
      <div className="cart-wrapper">
        <div className="cartBody">
          <div>
            <h1>Shopping Cart</h1>
            <h3>You have {cart ? cart.length : 0} items</h3>
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
                    <div className="quantity">Units: {qte}</div>
                    <div className="item-price">Price: ${item.price}</div>
                    <div className="item-total">
                      Subtotal: $
                      {Math.round(Number(qte) * Number(item.price) * 100) / 100}
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
      <div className="floating-cart">
        <button onClick={handleClear}>Clear Cart</button>
        <Link to="/">
          <button>Add another Item</button>
        </Link>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
        <div>
          <strong>Total ${getTotal()}</strong>
        </div>
      </div>
    </>
  );
};
export default Cart;
