/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const SignupLink = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-600">
        Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
      </p>
    </div>
  );
};

export default SignupLink;