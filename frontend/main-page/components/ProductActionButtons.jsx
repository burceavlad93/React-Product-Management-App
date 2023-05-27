import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProductActionButtons({ onDelete }) {
  const navigate = useNavigate(); // create navigate object
  // ------------------------------------------------------------ NAVIGATE TO SECOND PAGE ------------------------------------------------------------------
  function handleAddClick() {
    navigate("/addproduct");
  }
  // ------------------------------------------------------------ RENDER ----------------------------------------------------------------------------------
  return (
    <div className="button-container">
      <button type="button" className="btn btn-secondary" onClick={handleAddClick}>
        ADD
      </button>
      <button type="button" id="delete-product-btn" className="btn btn-secondary" onClick={onDelete}>
        MASS DELETE
      </button>
    </div>
  );
}

export default ProductActionButtons;
