import React, { useEffect, useState } from "react";

function DimensionsInputs({ values, onChange, isHeightValid, isWidthValid, isLengthValid, missingHeight, missingWidth, missingLength }) {
  // ------------------------------------------------------------ SET UP STATES ----------------------------------------------------------------------------
  const [heightError, setHeightError] = useState(false);
  const [touchedHeight, setTouchedHeight] = useState(false);
  const [widthError, setWidthError] = useState(false);
  const [touchedWidth, setTouchedWidth] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [touchedLength, setTouchedLength] = useState(false);
  const [heightErrorMessage, setHeightErrorMessage] = useState("Height field is required.");
  const [widthErrorMessage, setWidthErrorMessage] = useState("Width field is required.");
  const [lengthErrorMessage, setLengthErrorMessage] = useState("Length field is required.");
  // ------------------------------------------------------------ UPDATE STATES USING USE EFFECT -----------------------------------------------------------
  useEffect(() => {
    // if response from parent show field is not valid upon submision conditionally rende response
    setTouchedHeight(missingHeight);
    setHeightError(missingHeight);
    //----------------------------------
    setTouchedWidth(missingWidth);
    setWidthError(missingWidth);
    //----------------------------------
    setTouchedLength(missingLength);
    setLengthError(missingLength);
  }, [missingHeight, missingWidth, missingLength]);

  // ------------------------------------------------------------ HANDLE BLUR ------------------------------------------------------------------------------
  function handleHeightBlur() {
    // when input field looses focus perform check if it is valid and conditionally render response
    setTouchedHeight(true);
    setHeightError(values.height <= 0 || values.height.trim() === "");
    setHeightErrorMessage(values.height.trim() === "" ? "Height field is required." : "Please provide a valid number.");
    isHeightValid(values.height <= 0 || values.height.trim() === "" ? false : true);
  }

  function handleWidthBlur() {
    // when input field looses focus perform check if it is valid and conditionally render response
    setTouchedWidth(true);
    setWidthError(values.width <= 0 || values.width.trim() === "");
    setWidthErrorMessage(values.width.trim() === "" ? "Width field is required." : "Please provide a valid number.");
    isWidthValid(values.width <= 0 || values.width.trim() === "" ? false : true);
  }

  function handleLengthBlur() {
    // when input field looses focus perform check if it is valid and conditionally render response
    setTouchedLength(true);
    setLengthError(values.length <= 0 || values.length.trim() === "");
    setLengthErrorMessage(values.length.trim() === "" ? "Length field is required." : "Please provide a valid number.");
    isLengthValid(values.length <= 0 || values.length.trim() === "" ? false : true);
  }
  // ------------------------------------------------------------ RENDER -----------------------------------------------------------------------------------
  return (
    <div>
      <div>
        <div className={`input-group mb-3 ${touchedHeight && (heightError ? "has-error" : "has-success")}`}>
          <label htmlFor="height" className="input-group-text" id="inputGroup-sizing-default">
            Height (CM)
          </label>
          <input
            type="number"
            className={`form-control ${touchedHeight && (heightError ? "is-invalid" : "is-valid")}`}
            id="height"
            name="height"
            value={values.height}
            onChange={onChange}
            onBlur={handleHeightBlur}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        {touchedHeight && heightError && <div className="invalid-feedback d-block">{heightErrorMessage}</div>}
      </div>

      <div>
        <div className={`input-group mb-3 ${touchedWidth && (widthError ? "has-error" : "has-success")}`}>
          <label htmlFor="width" className="input-group-text" id="inputGroup-sizing-default">
            Width (CM)
          </label>
          <input
            type="number"
            className={`form-control ${touchedWidth && (widthError ? "is-invalid" : "is-valid")}`}
            id="width"
            name="width"
            value={values.width}
            onChange={onChange}
            onBlur={handleWidthBlur}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        {touchedWidth && widthError && <div className="invalid-feedback d-block">{widthErrorMessage}</div>}
      </div>

      <div>
        <div className={`input-group mb-3 ${touchedLength && (lengthError ? "has-error" : "has-success")}`}>
          <label htmlFor="length" className="input-group-text" id="inputGroup-sizing-default">
            Length (CM)
          </label>
          <input
            type="number"
            className={`form-control ${touchedLength && (lengthError ? "is-invalid" : "is-valid")}`}
            id="length"
            name="length"
            value={values.length}
            onChange={onChange}
            onBlur={handleLengthBlur}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        {touchedLength && lengthError && <div className="invalid-feedback d-block">{lengthErrorMessage}</div>}
        <label>Please, provide dimensions</label>
      </div>
    </div>
  );
}

export default DimensionsInputs;
