/* eslint-disable no-unused-vars */
import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupLink from '../components/SignupLink';

const LoginPage = () => {
  const handleLogin = (credentials) => {
    // console.log('Login attempt', credentials);
    // Add login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-950 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        <LoginForm onSubmit={handleLogin} />
        <SignupLink />
      </div>
    </div>
  );
};

export default LoginPage;