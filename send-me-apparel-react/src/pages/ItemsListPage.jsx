import React from "react";
import ItemsList from "../components/ItemsList";
import Nav from "../components/Nav";
import './ItemPage.css'

function ItemsListPage() {
  return (
    <div>
      <Nav />
      <ItemsList />
    </div>
  );
}

export default ItemsListPage;
