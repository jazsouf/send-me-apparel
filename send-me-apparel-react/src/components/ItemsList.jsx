import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CustomItem from "./CustomItem";

function ItemsList() {
  const params = useParams();
  const [product, setProduct] = useState("");
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [color_code, setColorCode] = useState([]);
  const [gender, setGender] = useState("m");
  const [selectColor, setSelectColor] = useState("White");
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
      .then((response) => {
        setDrawingImg(response.data.img);
      })
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
        setFilteredTeeShirt(
          variants.find((variant) => variant.color === "White")
        );
      } else {
        setGender("f");
        const { product, variants } = response.data.woman.result;
        setVariants(variants);
        setProduct(product);
        setFilteredTeeShirt(
          variants.find((variant) => variant.color === "White")
        );
      }
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
  }, [url]);

  useEffect(() => {
    createArrayFromVariants("color", setColors);

    createArrayFromVariants("color_code", setColorCode);
  }, [variants]);

  function displayItems(url) {
    setUrl(url);
    createArrayFromVariants("color", setColors);
  }

  function selectAShirt(color) {
    const filteredVariant = variants.find((variant) => variant.color === color);
    setFilteredTeeShirt(filteredVariant);
    console.log(filteredTeeShirt);
  }

  useEffect(() => {
    selectAShirt(selectColor);
  }, [selectColor]);

  const handleColorButtonClick = (color) => {
    console.log(color);
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
      <div className="item-wrapper">
        <div className="item-img">
          <CustomItem
            filteredTeeShirt={filteredTeeShirt}
            drawingImg={drawingImg}
            default={selectAShirt}
          />
          <Link to={`/edit/${params.drawing}`}>
            <button>Edit Drawing</button>
          </Link>
        </div>
        <div className="item-selector">
          <div className="gender">
            <h1>Item Selection</h1>
            <div className="separator"></div>
            <div className="gender-wrapper">
              <button
                onClick={() =>
                  displayItems(
                    "https://ironrest.fly.dev/api/send-me-apparel-items/645e032855e69e1b019f7f06"
                  )
                }
              >
                T-Shirt W
              </button>
              <button
                onClick={() =>
                  displayItems(
                    "https://ironrest.fly.dev/api/send-me-apparel-items/645e02be55e69e1b019f7f05"
                  )
                }
              >
                T-Shirt M
              </button>
            </div>
          </div>
          <div className="colors-wrapper">
            <h1>Colors</h1>
            <div className="separator"></div>

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
            <Link
              to={
                "/item/" +
                gender +
                "/" +
                filteredTeeShirt.id +
                "/" +
                params.drawing
              }
            >
              <button>Validate Item</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemsList;
