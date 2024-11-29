/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AtSign, Lock, User, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted', formData);
      // Add signup logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-slate-950 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="relative ">
            <User className="absolute left-3 top-3  text-gray-400" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none bg-slate-600 focus:ring-2 ${
                errors.username ? 'border-red-500' : 'border-black'
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative">
            <AtSign className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg bg-slate-600 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500' : 'border-black'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border bg-slate-600 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500' : 'border-black'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <CheckCircle className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border bg-slate-600 rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? 'border-red-500' : 'border-black'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-800 text-white  py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;