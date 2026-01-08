import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import api from "../api/api";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate('/home')
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is  required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await api.post("/auth/signup", {
          fullName: form.fullName,
          email: form.email,
          password: form.password
        });

        toast.success("Registered successful");
        setError({});
        setForm({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } catch (err) {
        console.error(err);
        const message = err.response?.data?.message || "Something went wrong. please try again";
        toast.error(message);
        if (message.toLowerCase().includes("email")) {
          setError({ email: message });
        }
      }
    }
  }





  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

        {/* NAME FIELD */}
        <input
          type='text'
          name='fullName'
          placeholder='Enter your name'
          className='w-full mb-4 p-2 border rounded'
          value={form.fullName}
          onChange={handleChange}
        />
        {error.fullName && (
          <p className="text-red-800 text-sm">{error.fullName}</p>
        )}

        {/* EMAIL */}
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          className='w-full mb-4 p-2 border rounded'
          value={form.email}
          onChange={handleChange}
        />
        {error.email && (
          <p className="text-red-800 text-sm">{error.email}</p>
        )}

        {/* PASSWORD */}
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          className='w-full mb-4 p-2 border rounded'
          onChange={handleChange}
        />
        {error.password && (
          <p className="text-red-800 text-sm">{error.password}</p>
        )}

        {/* CONFIRM PASSWORD */}
        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          className='w-full mb-4 p-2 border rounded'
          value={form.confirmPassword}
          onChange={handleChange}

        />
        {error.confirmPassword && (
          <p className="text-red-800 text-sm">{error.confirmPassword}</p>
        )}


        <button className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'>Sign up</button>
        <p className='text-sm text-center mt-4'>
          Already have an account
          <Link to='/login' className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup;
