// ------------------------------------------------------------ VALIDATE DVD FUNCTION ----------------------------------------------------------------------------

export function validateDVD(isSkuValid, isNameValid, isPriceValid, isSizeValid, isWeightValid, isHeightValid, isWidthValid, isLengthValid) {
  const isValid = isSkuValid && isNameValid && isPriceValid && isSizeValid;
  const errorFields = {
    sku: !isSkuValid,
    name: !isNameValid,
    price: !isPriceValid,
    size: !isSizeValid,
  };
  return { isValid, errorFields };
  // if all required product fields are valid isValid will be true and error fields will be false
  // if one field is false isValid will be false an the invalid field will be true
}

// ------------------------------------------------------------ VALIDATE BOOK FUNCTION ---------------------------------------------------------------------------

export function validateBook(isSkuValid, isNameValid, isPriceValid, isSizeValid, isWeightValid, isHeightValid, isWidthValid, isLengthValid) {
  const isValid = isSkuValid && isNameValid && isPriceValid && isWeightValid;
  const errorFields = {
    sku: !isSkuValid,
    name: !isNameValid,
    price: !isPriceValid,
    weight: !isWeightValid,
  };

  return { isValid, errorFields };
  // if all required product fields are valid isValid will be true and error fields will be false
  // if one field is false isValid will be false an the invalid field will be true
}

// ------------------------------------------------------------ VALIDATE FURNITURE FUNCTION ----------------------------------------------------------------------

export function validateFurniture(isSkuValid, isNameValid, isPriceValid, isSizeValid, isWeightValid, isHeightValid, isWidthValid, isLengthValid) {
  const isValid = isSkuValid && isNameValid && isPriceValid && isHeightValid && isWidthValid && isLengthValid;
  const errorFields = {
    sku: !isSkuValid,
    name: !isNameValid,
    price: !isPriceValid,
    height: !isHeightValid,
    width: !isWidthValid,
    length: !isLengthValid,
  };
  return { isValid, errorFields };
  // if all required product fields are valid isValid will be true and error fields will be false
  // if one field is false isValid will be false an the invalid field will be true
}
