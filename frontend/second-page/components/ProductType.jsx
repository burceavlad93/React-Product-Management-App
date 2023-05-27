import React, { useEffect, useState } from "react";

function ProductType({ onSelect, isValid, isMissing }) {
  // ------------------------------------------------------------ SET UP STATES ----------------------------------------------------------------------------
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Please select a product");
  // ------------------------------------------------------------ UPDATE STATES USING USE EFFECT -----------------------------------------------------------
  useEffect(() => {
    // if response from parent show field is not valid upon submision conditionally rende response
    setTouched(isMissing);
    setError(isMissing);
  }, [isMissing]);
  // ------------------------------------------------------------ HANDLE BLUR ------------------------------------------------------------------------------
  function handleSelectChange(event) {
    // get selected value and send to parent
    onSelect(event.target.value);
  }

  function handleBlur(event) {
    // when input field looses focus perform check if it is valid and conditionally render response
    setTouched(true);
    setError(event.target.value === "");
    isValid(event.target.value === "" ? false : true);
  }
  // ------------------------------------------------------------ RENDER -----------------------------------------------------------------------------------
  return (
    <div>
      <div className={`input-group mb-3 ${touched && (error ? "has-error" : "has-success")}`}>
        <label htmlFor="productType" className="input-group-text" id="inputGroup-sizing-default">
          Type Switcher{" "}
        </label>
        <select className={`form-select ${touched && (error ? "is-invalid" : "is-valid")}`} id="productType" onChange={handleSelectChange} onBlur={handleBlur}>
          <option value="">Select Product Type</option>
          <option value="DVD">DVD</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>
      {touched && error && <div className="invalid-feedback d-block">{errorMessage}</div>}
    </div>
  );
}

export default ProductType;
