/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default LoginLink;