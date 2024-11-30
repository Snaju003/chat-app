/* eslint-disable no-unused-vars */
import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginLink from '../components/LoginLink';

const SignupPage = () => {
  const handleSignup = (formData) => {
    // console.log('Form submitted', formData);
    // Add signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-950 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <SignupForm onSubmit={handleSignup} />
        <LoginLink />
      </div>
    </div>
  );
};

export default SignupPage;