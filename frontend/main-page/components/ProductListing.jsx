import axios from "axios";
import React, { useEffect, useState } from "react";

function Products({ onCheck, productsDeleted, onProductsReload }) {
  const [products, setProducts] = useState([]); //creat ID array for products
  // ------------------------------------------------------------ HANDLE CHECKBOXES ------------------------------------------------------------------------
  function handleCheckboxChange(event, id) {
    const checked = event.target.checked;
    if (checked) {
      // if element is checked
      onCheck((prevIds) => [...prevIds, id]); // is added to the array
    } else {
      // if element is unchecked
      onCheck((prevIds) => prevIds.filter((prevIds) => prevIds !== id)); // it will be removed from the array
    }
  }
  // ------------------------------------------------------------ GET LIST FROM DB -------------------------------------------------------------------------
  function getProducts() {
    axios
      .get("https://juniortest-burcea-vlad.000webhostapp.com/php/api.php?method=list_products") // get data from backend using '?method=list_products'
      .then(function (response) {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // ------------------------------------------------------------ useEffect Hooks --------------------------------------------------------------------------

  useEffect(() => {
    // calling 'getProducts()' function everytime 'productsDeleted' prop is updated
    getProducts();
  }, [productsDeleted]);

  useEffect(() => {
    // checking if there are elements in the ID array and 'productsDeleted' prop is true everytime products, productsDeleted, onProductsReload are updated
    if (products.length > 0 && productsDeleted) {
      setProducts([]); // clear array
      onProductsReload(); // call the callback function to reset productsDeleted
    }
  }, [products, productsDeleted, onProductsReload]);

  // ------------------------------------------------------------ PRODUCT OBJECT ----------------------------------------------------------------------------
  const cardList = products.map((product, index) => (
    <div className="card delete-checkbox" key={product.id} style={{ width: "12rem" }}>
      <div className="card-body">
        <input
          className=".delete-checkbox form-check-input mt-0"
          type="checkbox"
          value=""
          aria-label="Checkbox for following text input"
          onChange={(event) => handleCheckboxChange(event, product.id)}
        />
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="card-text">{product.sku}</p>
          <p className="card-text">{product.name}</p>
          <p className="card-text">{product.price.toFixed(2)} $</p>
          {product.size !== null && <p className="card-text">{product.size} MB</p>}
          {product.weight !== null && <p className="card-text">{product.weight} KG</p>}
          {product.length !== null && <p className="card-text">{`${product.length} x ${product.width} x ${product.height}`}</p>}
        </div>
      </div>
    </div>
  ));
  // ------------------------------------------------------------ RENDER ----------------------------------------------------------------------------------
  return <div className="card-container">{cardList}</div>;
}

export default Products;
