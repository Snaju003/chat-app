/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const FormInput = ({ 
  icon, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  error 
}) => {
  return (
    <div className="relative">
      {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-600 focus:outline-none focus:ring-2 ${
          error ? 'border-red-500' : 'border-black'
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;