import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ValidationButtons({ onSubmit }) {
  const navigate = useNavigate(); // create navigation object

  function handleCancelButton() {
    // navigate to main page when CANCEL button is clicked
    navigate("/");
  }

  return (
    <div className="button-container">
      <button type="button" className="btn btn-secondary" onClick={onSubmit}>
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={handleCancelButton}>
        Cancel
      </button>
    </div>
  );
}

export default ValidationButtons;
