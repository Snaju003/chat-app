// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { AtSign, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password');
      return;
    }
    
    // Add login logic here
    console.log('Login attempt', credentials);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-950 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <AtSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full pl-10 bg-slate-600 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div className="relative ">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full pl-10 bg-slate-600 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between ">
            <label className="flex items-center ">
              <input 
                type="checkbox" 
                className="mr-2 bg-color-white rounded text-blue-500 focus:ring-blue-400"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;