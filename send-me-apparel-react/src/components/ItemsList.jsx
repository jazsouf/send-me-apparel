import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CustomItem from "./CustomItem";

function ItemsList() {
  const params = useParams();
  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizing, setSizing] = useState([]);
  const [color_code, setColorCode] = useState([]);
  const [selectSize, setSelectSize] = useState("Army");
  const [gender, setGender] = useState("m");
  const [selectColor, setSelectColor] = useState("2XL");
  const [url, setUrl] = useState(
    "https://ironrest.fly.dev/api/send-me-apparel-items/645e02be55e69e1b019f7f05"
  );
  const [filteredTeeShirt, setFilteredTeeShirt] = useState(null);
  const [drawingImg, setDrawingImg] = useState("");
  function fetchDrawing() {
    axios
      .get(
        `https://ironrest.fly.dev/api/send-me-apparel-drawings/${params.drawing}`
      )
      .then((response) => setDrawingImg(response.data.img))
      .catch((error) => console.log(error));
  }
  function fetchItems() {
    axios.get(url).then((response) => {
      console.log(response.data._id);
      if (response.data._id == "645e02be55e69e1b019f7f05") {
        setGender("m");
        const { product, variants } = response.data.men.result;
        setVariants(variants);
        setProduct(product);
      } else {
        setGender("f");
        const { product, variants } = response.data.woman.result;
        setVariants(variants);
        setProduct(product);
      }
      // console.log(response.data.men.result);
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
    fetchDrawing();
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
    // console.log(filteredTeeShirt.id)
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
      <div></div>
      <button
        onClick={() =>
          displayItems(
            "https://ironrest.fly.dev/api/send-me-apparel-items/645e032855e69e1b019f7f06"
          )
        }
      >
        Women
      </button>
      <button
        onClick={() =>
          displayItems(
            "https://ironrest.fly.dev/api/send-me-apparel-items/645e02be55e69e1b019f7f05"
          )
        }
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
      {/* {filteredTeeShirt && (
        <>
          <div
            className="customWrapper"
            style={{ display: "block", position: "relative" }}
          >
            <img
              src={drawingImg}
              alt=""
              style={{
                position: "absolute",
                width: "25%",
                top: "36%",
                left: "50%",
                transform: "translateX(-50%)",
                mixBlendMode: "multiply",
              }}
            />

            <img src={filteredTeeShirt.image}></img>
          </div>
          <div>name: {filteredTeeShirt.name}</div>
          <div>Size: {filteredTeeShirt.size}</div>
        </>
      )} */}
      <CustomItem filteredTeeShirt={filteredTeeShirt} drawingImg={drawingImg} />
      <button>
        <Link to={`/edit/${params.drawing}`}>Edit Drawing</Link>
      </button>
      {product.description}
      {filteredTeeShirt && (
        <button>
          <Link
            to={
              "/cart/" +
              gender +
              "/" +
              filteredTeeShirt.id +
              "/" +
              params.drawing
            }
          >
            Go to Cart
          </Link>
        </button>
      )}
    </div>
  );
}

export default ItemsList;
