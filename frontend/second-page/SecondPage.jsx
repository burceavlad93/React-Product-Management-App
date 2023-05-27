import React, { useState } from "react";
import { validateDVD, validateBook, validateFurniture } from "./functions/validateInputs";
import AddPageTitle from "./components/AddPageTitle";
import ValidationAndCancelButtons from "./components/ValidationAndCancelButtons";
import SkuInput from "./components/SkuInput";
import NameInput from "./components/NameInput";
import PriceInput from "./components/PriceInput";
import ProductType from "./components/ProductType";
import SizeInput from "./components/SizeInput";
import WeightInput from "./components/WeightInput";
import DimensionsInputs from "./components/DimensionsInputs";
import Footer from "../Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SecondPage() {
  const navigate = useNavigate(); // create navigation object
  // ------------------------------------------------------------ SET UP STATES ----------------------------------------------------------------------------
  // ------------------------------------------------------------ FOR SENDING DATA -------------------------------------------------------------------------
  const [selectType, setSelectType] = useState("");
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });
  // ------------------------------------------------------------ FOR VALIDATION ---------------------------------------------------------------------------
  const [isSkuValid, setIsSkuValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isSizeValid, setIsSizeValid] = useState(false);
  const [isProductValid, setIsProductValid] = useState(false);
  const [isWeightValid, setIsWeightValid] = useState(false);
  const [isHeightValid, setIsHeightValid] = useState(false);
  const [isWidthValid, setIsWidthValid] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  // ------------------------------------------------------------ FOR SUBMIT RESPONSE ----------------------------------------------------------------------
  const [skuSubmitResponse, setSkuSubmitResponse] = useState(false);
  const [nameSubmitResponse, setNameSubmitResponse] = useState(false);
  const [priceSubmitResponse, setPriceSubmitResponse] = useState(false);
  const [productSubmitResponse, setProductSubmitRespone] = useState(false);
  const [sizeSubmitResponse, setSizeSubmitResponse] = useState(false);
  const [weightSubmitResponse, setWeightSubmitResponse] = useState(false);
  const [heightSubmitResponse, setHeightSubmitResponse] = useState(false);
  const [widthSubmitResponse, setWidthSubmitResponse] = useState(false);
  const [lengthSubmitResponse, setLengthSubmitResponse] = useState(false);
  // ------------------------------------------------------------ FOR UNIQUE SKU ---------------------------------------------------------------------------
  const [skuIsNotUnique, setSkuIsNotUnique] = useState(false);
  // ------------------------------------------------------------ VALIDATION OBJECT ------------------------------------------------------------------------
  const validationFunctions = {
    DVD: validateDVD,
    Book: validateBook,
    Furniture: validateFurniture,
  };
  // ------------------------------------------------------------ UPDATING FORMDATA ON CHANGE --------------------------------------------------------------
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  // ------------------------------------------------------------ SUBMIT FUNCTION --------------------------------------------------------------------------
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let sendData = false;
    let validationFunction = validationFunctions[selectType];
    let errorFields;
    // -->
    if (!validationFunction) {
      // if no product is selected
      if (!isSkuValid) setSkuSubmitResponse(true); // check if sku is valid
      if (!isNameValid) setNameSubmitResponse(true); // check if name is valid
      if (!isPriceValid) setPriceSubmitResponse(true); // check if price is valid
      setProductSubmitRespone(true); // because no product is selecte product response is set to true
      return;
    }

    // perform validation on the input fields and retrieve the validation results
    // isValid: indicates whether all fields passed validation
    // errorFields: an array of fields that failed validation
    ({ isValid: sendData, errorFields } = validationFunction(isSkuValid, isNameValid, isPriceValid, isSizeValid, isWeightValid, isHeightValid, isWidthValid, isLengthValid));

    if (sendData) {
      // if required product data is valid proceed with api call
      let fData = new FormData(); // create form data for api
      fData.append("sku", formData.sku);
      fData.append("name", formData.name);
      fData.append("price", formData.price);
      fData.append("productType", selectType);
      fData.append("size", formData.size);
      fData.append("weight", formData.weight);
      fData.append("height", formData.height);
      fData.append("width", formData.width);
      fData.append("length", formData.length);
      // Send the form data to the API
      axios
        .post("https://juniortest-burcea-vlad.000webhostapp.com/php/api.php?method=save_products", fData) // send data to backend using '?method=save_products'
        .then((response) => {
          console.log("Form data sent successfully");
          navigate("/"); // go back to main page
        })
        .catch((error) => {
          if (error.response) {
            console.log("API error:", error.response.status);
            if (error.response.status === 400) {
              // in case of duplicate sku
              console.log("Duplicate entry error");
              setSkuIsNotUnique(true); // set sku not unique to true
              setSkuSubmitResponse(true); // set sku response to true
            } else {
              console.log("Other error occurred");
            }
          } else {
            console.error("Request failed:", error.message);
          }
        });
    } else {
      // if required product data is NOT valid, send apropriate prop response to each input
      setSkuSubmitResponse(errorFields.sku);
      setNameSubmitResponse(errorFields.name);
      setPriceSubmitResponse(errorFields.price);
      setSizeSubmitResponse(errorFields.size);
      setWeightSubmitResponse(errorFields.weight);
      setHeightSubmitResponse(errorFields.height);
      setWidthSubmitResponse(errorFields.width);
      setLengthSubmitResponse(errorFields.length);
      setSkuIsNotUnique(false);
    }
  };
  // ------------------------------------------------------------ RENDER ----------------------------------------------------------------------------------
  return (
    <div className="second-page">
      <div id="header-secondPage">
        <AddPageTitle />
        <ValidationAndCancelButtons onSubmit={handleFormSubmit} />
      </div>
      <hr />
      <div className="input-group mb-3">
        <form id="product_form">
          <SkuInput value={formData.sku} onChange={handleInputChange} isValid={setIsSkuValid} isMissing={skuSubmitResponse} notUnique={skuIsNotUnique} />
          <NameInput value={formData.name} onChange={handleInputChange} isValid={setIsNameValid} isMissing={nameSubmitResponse} />
          <PriceInput value={formData.price} onChange={handleInputChange} isValid={setIsPriceValid} isMissing={priceSubmitResponse} />
          <ProductType onSelect={setSelectType} isValid={setIsProductValid} isMissing={productSubmitResponse} />
          {selectType === "DVD" && <SizeInput value={formData.size} onChange={handleInputChange} isValid={setIsSizeValid} isMissing={sizeSubmitResponse} />}
          {selectType === "Book" && <WeightInput value={formData.weight} onChange={handleInputChange} isValid={setIsWeightValid} isMissing={weightSubmitResponse} />}
          {selectType === "Furniture" && (
            <DimensionsInputs
              values={formData}
              onChange={handleInputChange}
              isHeightValid={setIsHeightValid}
              isWidthValid={setIsWidthValid}
              isLengthValid={setIsLengthValid}
              missingHeight={heightSubmitResponse}
              missingWidth={widthSubmitResponse}
              missingLength={lengthSubmitResponse}
            />
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SecondPage;