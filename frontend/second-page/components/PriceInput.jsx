import React, { useEffect, useState } from "react";

function WeightInput({ value, onChange, isValid, isMissing }) {
  // ------------------------------------------------------------ SET UP STATES ----------------------------------------------------------------------------
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Price field is required.");
  // ------------------------------------------------------------ UPDATE STATES USING USE EFFECT -----------------------------------------------------------
  useEffect(() => {
    // if response from parent show field is not valid upon submision conditionally rende response
    setTouched(isMissing);
    setError(isMissing);
  }, [isMissing]);
  // ------------------------------------------------------------ HANDLE BLUR ------------------------------------------------------------------------------
  function handleBlur() {
    // when input field looses focus perform check if it is valid and conditionally render response
    setTouched(true);
    setError(value <= 0 || value.trim() === "");
    setErrorMessage(value.trim() === "" ? "Price field is required." : "Please provide a valid number.");
    isValid(value <= 0 || value.trim() === "" ? false : true);
  }
  // ------------------------------------------------------------ RENDER -----------------------------------------------------------------------------------
  return (
    <div>
      <div className={`input-group mb-3 ${touched && (error ? "has-error" : "has-success")}`}>
        <label htmlFor="price" className="input-group-text" id="inputGroup-sizing-default">
          Price $
        </label>
        <input
          type="number"
          className={`form-control ${touched && (error ? "is-invalid" : "is-valid")}`}
          id="price"
          name="price"
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

export default WeightInput;
