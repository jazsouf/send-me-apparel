import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemsList() {
  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizing, setSizing] = useState([]);
  const [color_code, setColorCode] = useState([]);
  const [selectSize, setSelectSize] = useState("Army");
  const [selectColor, setSelectColor] = useState("2XL");
  const [url, setUrl] = useState("../src/m-tee-shirt.json");
  const [filteredTeeShirt, setFilteredTeeShirt] = useState(null);

  function fetchItems() {
    axios.get(url).then((response) => {
      const { product, variants } = response.data.result;
      console.log(response.data.result);
      setVariants(variants);
      setProduct(product);
    });
  }

  function createArrayFromVariants(property, stateSetter) {
    const mappedProperty = variants.map((variant) => variant[property]);
    const uniqueProperty = mappedProperty.filter(
      (item, index) => mappedProperty.indexOf(item) === index
    );
    stateSetter(uniqueProperty);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    createArrayFromVariants("color", setColors);
    createArrayFromVariants("size", setSizing);
    createArrayFromVariants("color_code", setColorCode);
  }, [variants]);

  function displayItems(url) {
    setUrl(url);
    fetchItems();
    createArrayFromVariants("color", setColors);
    createArrayFromVariants("size", setSizing);
  }

  function selectAShirt(size, color) {
    const filteredVariant = variants.find(
      (variant) => variant.size === size && variant.color === color
    );
    setFilteredTeeShirt(filteredVariant);
  }

  useEffect(() => {
    selectAShirt(selectSize, selectColor);
  }, [selectSize, selectColor]);

  const handleSelectChange = (event) => {
    setSelectSize(event.target.value);
  };

  const handleColorButtonClick = (color) => {
    setSelectColor(color);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => displayItems("../src/f-tee-shirt.json")}
        style={{
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        Women
      </button>
      <button
        onClick={() => displayItems("../src/m-tee-shirt.json")}
        style={{
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        Men
      </button>

      <select value={selectSize} onChange={handleSelectChange}>
        <option value="">Select a Size</option>
        {sizing.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <div style={{ display: "flex" }}>
        {colors.map((color, index) => (
          // console.log(color)
          <button
            key={color}
            onClick={() => handleColorButtonClick(color)}
            style={{
              backgroundColor: color_code[index], // Use the color as the background color
              width: "50px",
              height: "50px",
              margin: "5px",
              border: "1px solid black",
            }}
          ></button>
        ))}
      </div>

      {filteredTeeShirt && (
        <>
          <div>
            <img src={filteredTeeShirt.image}></img>
          </div>
          <div>name: {filteredTeeShirt.name}</div>
          <div>Size: {filteredTeeShirt.size}</div>
        </>
      )}

      {product.description}
    </div>
  );
}

export default ItemsList;
