import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomItem from "./CustomItem";
import { Link } from "react-router-dom";

import "../assets/paths";

function Item() {
  const { gender, id, drawing } = useParams();
  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState("");
  const [item, setItem] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [drawingImg, setDrawingImg] = useState("");
  const [sizing, setSizing] = useState([
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
  ]);
  const [selectSize, setSelectSize] = useState("M");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [qte, setQte] = useState(1);
  const handleSelectChange = (event) => {
    setSelectSize(event.target.value);
    item.size = event.target.value;
    // console.log(item);
  };
  function fetchItem() {
    axios
      .get(
        gender === "m"
          ? "https://ironrest.fly.dev/api/send-me-apparel-items/645e02be55e69e1b019f7f05"
          : "https://ironrest.fly.dev/api/send-me-apparel-items/645e032855e69e1b019f7f06"
      )
      .then((response) => {
        // console.log("item data", response.data);

        // console.log(response);
        const { product, variants } =
          gender === "m"
            ? response.data.men.result
            : response.data.woman.result;
        setProduct(product);
        setVariants(variants);
        // console.log(variants);
        const itemObject = variants.find(
          (variant) => variant.id === Number(id)
        );
        // console.log("itemObj", itemObject);
        setItem(itemObject);
        setPrice(item.price);
        setName(item.name);

        setIsFetched(true);
      });
  }
  function fetchDrawing() {
    axios
      .get(`https://ironrest.fly.dev/api/send-me-apparel-drawings/${drawing}`)
      .then((response) => setDrawingImg(response.data.img))
      .catch((error) => console.log(error));
  }

  function handleQte(e) {
    setQte(e.target.value);
  }

  useEffect(() => {
    fetchItem();
    fetchDrawing();
  }, [isFetched]);

  function handleAddToCart() {
    // const localCart = JSON.parse(localStorage.getItem("items") || "[]");
    const itemToAdd = { item, drawingImg, qte, selectSize };
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...localCart, itemToAdd]));
    // console.log("item", [itemToAdd]);
  }
  return (
    <>
      <div className="item-wrapper">
        <div className="item-img">
          <CustomItem filteredTeeShirt={item} drawingImg={drawingImg} />
        </div>
        <div className="item-selector">
          <div className="gender">
            <h1>
              <strong className="test">Product</strong>{" "}
              {name && name.substring(0, name.indexOf("("))}—{price && price}
              <span>$</span>
            </h1>
            <div className="separator"></div>
            {product.description}
          </div>
          <div className="colors-wrapper sizing">
            <h1>Select Size & Quantity</h1>
            <div className="separator"></div>
            <div className="input-wrapper">
              <select value={selectSize} onChange={handleSelectChange}>
                <option value="">Select Size</option>
                {sizing.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div>
                <label htmlFor="qte">Quantity</label>
                <input
                  placeholder="quantity"
                  type="number"
                  min="1"
                  value={qte}
                  onChange={handleQte}
                />
              </div>
            </div>
          </div>
          <div className="buttons-wrapper">
          
            <button className="outline">
              <Link to={`/items/${drawing}`}>Back to item selection</Link>
            </button>
            <button onClick={handleAddToCart}>
              <Link to="/cart">Add to cart</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
