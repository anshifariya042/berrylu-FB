import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from "../api/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState({})
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      return;
    }
    setError({});
    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      const { user, token } = response.data;

      if (user.blocked) {
        toast.error("Your account has been blocked. please contact admin.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");

      if (user.role === 'admin') {
        toast.success("Welcome Admin!");
        navigate("/admin");
      } else {
        toast.success("Login successful!");
        navigate('/home')
      }

    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Something went wrong. please try again";
      setError({ general: message });
      toast.error(message);
    }

  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //  validation---
  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is  required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <input
          type='email'
          name="email"
          placeholder='Email'
          className='w-full mb-4 p-2 border rounded'
          value={form.email}
          onChange={handleChange}
        />
        {error.email && (
          <p className="text-red-800 text-sm">{error.email}</p>
        )}

        <input
          type='password'
          name='password'
          placeholder='password'
          className='w-full mb-4 p-2 border rounded'
          value={form.password}
          onChange={handleChange}
        />
        {error.password && (
          <p className="text-red-800 text-sm">{error.password}</p>
        )}

        <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Login</button>
        <p>
          Don't have an account?{" "}
          <Link to='/signup' className='text-blue-500 hover:underline'>Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login

