/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AtSign, Lock, User} from 'lucide-react';
import FormInput from './FormInput';

const LoginForm = ({ onSubmit }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
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
    // console.log(credentials)
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }
    
    onSubmit(credentials);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <FormInput
        icon={<User className="absolute left-3 top-3 text-gray-400" />}
        type="username"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />

      <FormInput
        icon={<Lock className="absolute left-3 top-3 text-gray-400" />}
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;