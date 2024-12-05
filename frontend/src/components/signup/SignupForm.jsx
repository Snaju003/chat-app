/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AtSign, Lock, User, CheckCircle, CircleUserRound } from "lucide-react";
import FormInput from "./FormInput";
import GenderCheckbox from "./Checkbox";

const SignupForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <FormInput
        icon={
          <CircleUserRound className='absolute left-3 top-3 text-gray-400' />
        }
        type='fullname'
        name='fullname'
        placeholder='Your name'
        value={formData.fullname}
        onChange={handleChange}
        error={errors.fullname}
      />

      <FormInput
        icon={<User className='absolute left-3 top-3 text-gray-400' />}
        type='text'
        name='username'
        placeholder='Username'
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <FormInput
        icon={<Lock className='absolute left-3 top-3 text-gray-400' />}
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <FormInput
        icon={<CheckCircle className='absolute left-3 top-3 text-gray-400' />}
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <GenderCheckbox
        label='Select Your Gender'
        onChange={handleGenderChange}
      />

      <button
        type='submit'
        className='w-full bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300'
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
