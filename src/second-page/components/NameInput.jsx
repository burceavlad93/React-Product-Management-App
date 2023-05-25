import React, { useEffect, useState } from "react";

function NameInput({ value, onChange, isValid, isMissing }) {
  // ------------------------------------------------------------ SET UP STATES ----------------------------------------------------------------------------
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Name field is required.");
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
    setError(value.trim() == "");
    isValid(value.trim() === "" ? false : true);
  }
  // ------------------------------------------------------------ RENDER -----------------------------------------------------------------------------------
  return (
    <div>
      <div className={`input-group mb-3 ${touched && (error ? "has-error" : "has-success")}`}>
        <label htmlFor="name" className="input-group-text" id="inputGroup-sizing-default">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${touched && (error ? "is-invalid" : "is-valid")}`}
          id="name"
          name="name"
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

export default NameInput;
