import React from "react";
import "./ErrorMessage.css";

export const ErrorMessage = ({ onClear }: { onClear: () => void }) => {
  return (
    <div className="save-error-popup">
      <span>Error! This image has already exists in saved messages!</span>
      <div className="close-btn" onClick={onClear} />
    </div>
  );
};
