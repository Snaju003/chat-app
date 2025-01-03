/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const GenderCheckbox = ({ 
  label = "Select Gender",
  onChange,
}) => {
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);

    if (onChange) {
      onChange(gender);
    }
  };

  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <div className="flex gap-4">
        <label className="label cursor-pointer flex items-center gap-2">
          <input 
            type="radio" 
            name="gender" 
            value="male"
            checked={selectedGender === "male"}
            onChange={() => handleGenderChange("male")}
            className="radio radio-primary"
          />
          <span className="label-text">Male</span>
        </label>
        <label className="label cursor-pointer flex items-center gap-2">
          <input 
            type="radio" 
            name="gender" 
            value="female"
            checked={selectedGender === "female"}
            onChange={() => handleGenderChange("female")}
            className="radio radio-primary"
          />
          <span className="label-text">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
