// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';
// import api from "../api/api";

// function Signup() {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("currentUser");
//     if (user) {
//       navigate('/home')
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   const validate = () => {
//     const newErrors = {};
//     if (!form.fullName) newErrors.fullName = "Name is required";
//     if (!form.email) newErrors.email = "Email is required";
//     else if (!form.email.includes("@")) newErrors.email = "Invalid email";
//     if (!form.password) newErrors.password = "Password is  required";
//     else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
//     if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//     return newErrors;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     setError(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         await api.post("/auth/signup", {
//           fullName: form.fullName,
//           email: form.email,
//           password: form.password
//         });

//         toast.success("Registered successful");
//         setError({});
//         setForm({
//           fullName: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });
//         navigate("/login");
//       } catch (err) {
//         console.error(err);
//         const message = err.response?.data?.message || "Something went wrong. please try again";
//         toast.error(message);
//         if (message.toLowerCase().includes("email")) {
//           setError({ email: message });
//         }
//       }
//     }
//   }





//   return (
//     <div className='flex justify-center items-center h-screen bg-gray-50'>
//       <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-md w-96'>
//         <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

//         {/* NAME FIELD */}
//         <input
//           type='text'
//           name='fullName'
//           placeholder='Enter your name'
//           className='w-full mb-4 p-2 border rounded'
//           value={form.fullName}
//           onChange={handleChange}
//         />
//         {error.fullName && (
//           <p className="text-red-800 text-sm">{error.fullName}</p>
//         )}

//         {/* EMAIL */}
//         <input
//           type='email'
//           name='email'
//           placeholder='Enter your email'
//           className='w-full mb-4 p-2 border rounded'
//           value={form.email}
//           onChange={handleChange}
//         />
//         {error.email && (
//           <p className="text-red-800 text-sm">{error.email}</p>
//         )}

//         {/* PASSWORD */}
//         <input
//           type='password'
//           name='password'
//           placeholder='Password'
//           value={form.password}
//           className='w-full mb-4 p-2 border rounded'
//           onChange={handleChange}
//         />
//         {error.password && (
//           <p className="text-red-800 text-sm">{error.password}</p>
//         )}

//         {/* CONFIRM PASSWORD */}
//         <input
//           type='password'
//           name='confirmPassword'
//           placeholder='Confirm Password'
//           className='w-full mb-4 p-2 border rounded'
//           value={form.confirmPassword}
//           onChange={handleChange}

//         />
//         {error.confirmPassword && (
//           <p className="text-red-800 text-sm">{error.confirmPassword}</p>
//         )}


//         <button className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'>Sign up</button>
//         <p className='text-sm text-center mt-4'>
//           Already have an account
//           <Link to='/login' className="text-blue-500 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   )
// }

// export default Signup;


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
    if (!form.password) newErrors.password = "Password is required";
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
    <div className='flex justify-center items-center min-h-screen bg-[#fcfcfc] px-4 py-10'>
      <div className='bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-gray-100'>
        <div className="text-center mb-10">
          <h2 className='text-4xl font-black mb-2 text-gray-900 tracking-tighter uppercase italic'>Create Account</h2>
          <p className="text-gray-400 font-medium text-sm">Join the Berrylu fashion community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME FIELD */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
            <input
              type='text'
              name='fullName'
              className={`w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all outline-none ${error.fullName ? 'ring-1 ring-red-400' : ''}`}
              value={form.fullName}
              onChange={handleChange}
            />
            {error.fullName && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">{error.fullName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
            <input
              type='email'
              name='email'
              className={`w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all outline-none ${error.email ? 'ring-1 ring-red-400' : ''}`}
              value={form.email}
              onChange={handleChange}
            />
            {error.email && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">{error.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
            <input
              type='password'
              name='password'
              value={form.password}
              className={`w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all outline-none ${error.password ? 'ring-1 ring-red-400' : ''}`}
              onChange={handleChange}
            />
            {error.password && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">{error.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              className={`w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all outline-none ${error.confirmPassword ? 'ring-1 ring-red-400' : ''}`}
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {error.confirmPassword && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">{error.confirmPassword}</p>
            )}
          </div>

          <button className='w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-600 transition-all duration-300 shadow-xl shadow-gray-200 mt-4 active:scale-95'>
            Sign Up
          </button>
          
          <div className="text-center mt-8">
            <p className="text-sm font-medium text-gray-500">
              Already have an account?{" "}
              <Link to='/login' className='text-pink-600 font-black hover:underline tracking-tight ml-1'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;