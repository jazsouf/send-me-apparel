import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { gender, id } = useParams();
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState("");
  const [item, setItem] = useState("");

  function fetchItem() {
    axios
      .get(
        gender === "m"
          ? "https://ironrest.fly.dev/api/send-me-apparel-items/645e02be55e69e1b019f7f05"
          : "https://ironrest.fly.dev/api/send-me-apparel-items/645e032855e69e1b019f7f06"
      )
      .then((response) => {
        // console.log(response.data)
        console.log(response);
        const { product, variants } =
          gender === "m"
            ? response.data.men.result
            : response.data.woman.result;
        setProduct(product);
        setVariants(variants);
        const itemObject = variants.find(
          (variant) => variant.id === Number(id)
        );
        setItem(itemObject);

        // console.log(itemObject);
      });
  }

  useEffect(() => {
    fetchItem();
    // displayFilteredItem();
  }, []);

  return (
    <>
      <div>
        <img src={item.image}></img>
      </div>
      <div>name: {item.name}</div>
      <div>Size: {item.size}</div>
    </>
  );
}

export default Cart;
