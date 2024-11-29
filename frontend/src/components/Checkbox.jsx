/* eslint-disable no-unused-vars */
import React from 'react';

const RememberMeCheckbox = () => {
  return (
    <label className="flex items-center">
      <input 
        type="checkbox" 
        className="mr-2 bg-color-white rounded text-blue-500 focus:ring-blue-400"
      />
      <span className="text-sm text-gray-600">Remember me</span>
    </label>
  );
};

export default RememberMeCheckbox;