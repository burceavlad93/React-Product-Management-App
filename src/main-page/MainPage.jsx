import React, { useState } from "react";
import ProductPageTitle from "./components/ProductPageTitle";
import ProductActionButtons from "./components/ProductActionButtons";
import Footer from "../Footer";
import Products from "./components/ProductListing";
import axios from "axios";

function MainPage() {
  // ------------------------------------------------------------ SET UP STATES ---------------------------------------------------------------------------
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productsDeleted, setProductsDeleted] = useState(false);
  // ------------------------------------------------------------ DETELE REQUEST --------------------------------------------------------------------------
  function handleDelete() {
    const formData = new URLSearchParams(); // create a new instance of URLSearchParams() object
    selectedProducts.forEach((id) => {
      // loop over each element within 'selectedProducts'
      formData.append("data[]", id); // append each ID to data array
    });

    axios
      .post("https://juniortest-burcea-vlad.000webhostapp.com/php/api.php?method=delete_products", formData) // send data to backend using '?method=delete_products'
      .then((response) => {
        console.log(response);
        console.log("Selected Products: ", selectedProducts);
        setSelectedProducts([]);
        setProductsDeleted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // ------------------------------------------------------------ RENDER ----------------------------------------------------------------------------------
  return (
    <div className="main-page">
      <div id="header-mainPage">
        <ProductPageTitle />
        <ProductActionButtons onDelete={handleDelete} />
      </div>
      <hr />
      <div className="content">
        <Products onCheck={setSelectedProducts} productsDeleted={productsDeleted} onProductsReload={() => setProductsDeleted(false)} />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
