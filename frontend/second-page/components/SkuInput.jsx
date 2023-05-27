import axios from "axios";
import React, { useEffect, useState } from "react";

function SkuInput({ value, onChange, isValid, isMissing, notUnique }) {
  // ------------------------------------------------------------ SET UP STATES ----------------------------------------------------------------------------
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Sku field is required.");
  // ------------------------------------------------------------ UPDATE STATES USING USE EFFECT -----------------------------------------------------------
  useEffect(() => {
    // if response from parent show field is not valid upon submision conditionally rende response
    setTouched(isMissing);
    setError(isMissing);
    setErrorMessage(notUnique ? "Sku must be unique" : "Sku field is required.");
    console.log("Is sku unique", notUnique);
  }, [isMissing, notUnique]);
  // ------------------------------------------------------------ HANDLE BLUR ------------------------------------------------------------------------------
  function handleBlur() {
    // when input field looses focus perform check if it is valid and conditionally render response
    setTouched(true);
    setError(value.trim() === "");
    isValid(value.trim() === "" ? false : true);
  }
  // ------------------------------------------------------------ RENDER -----------------------------------------------------------------------------------
  return (
    <div>
      <div className={`input-group mb-3 ${touched && (error ? "has-error" : "has-success")}`}>
        <label htmlFor="sku" className="input-group-text" id="inputGroup-sizing-default">
          SKU
        </label>
        <input
          type="text"
          className={`form-control ${touched && (error ? "is-invalid" : "is-valid")}`}
          id="sku"
          name="sku"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      {touched && error && <div className="invalid-feedback d-block">{errorMessage}</div>}
    </div>
  );
}

export default SkuInput;
