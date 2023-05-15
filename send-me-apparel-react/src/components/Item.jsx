import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomItem from "./CustomItem";

function Item() {
  const { gender, id, drawing } = useParams();
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState("");
  const [item, setItem] = useState("");
  const [drawingImg, setDrawingImg] = useState("");
  const [sizing, setSizing] = useState(["S", "M", "L", "XL", "2XL"]);
  const [selectSize, setSelectSize] = useState("M");
  const [price, setPrice] = useState("");
  const handleSelectChange = (event) => {
    setSelectSize(event.target.value);
  };
  function fetchItem() {
    axios
      .get(
        gender === "m"
          ? "https://ironrest.fly.dev/api/send-me-apparel-items/645e02be55e69e1b019f7f05"
          : "https://ironrest.fly.dev/api/send-me-apparel-items/645e032855e69e1b019f7f06"
      )
      .then((response) => {
        console.log("item data", response.data);

        // console.log(response);
        const { product, variants } =
          gender === "m"
            ? response.data.men.result
            : response.data.woman.result;
        setProduct(product);
        setVariants(variants);
        console.log(variants);
        setPrice(item.price);
        const itemObject = variants.find(
          (variant) => variant.id === Number(id)
        );
        setItem(itemObject);

        // console.log(itemObject);
      });
  }
  function fetchDrawing() {
    axios
      .get(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${drawing}`)
      .then((response) => setDrawingImg(response.data.img))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchItem();
    fetchDrawing();
  }, []);

  return (
    <>
      <CustomItem filteredTeeShirt={item} drawingImg={drawingImg} />
      <div>
        <span>Price:</span> {price} <span>$</span>
      </div>
      <select value={selectSize} onChange={handleSelectChange}>
        <option value="">Select a Size</option>
        {sizing.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </>
  );
}

export default Item;
