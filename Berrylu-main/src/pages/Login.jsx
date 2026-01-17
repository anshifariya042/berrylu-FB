// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import api from "../api/api";

// function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   })
//   const [error, setError] = useState({})
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setError(newErrors)
//       return;
//     }
//     setError({});
//     try {
//       const response = await api.post("/auth/login", {
//         email: form.email,
//         password: form.password
//       });

//       const { user, token } = response.data;

//       if (user.blocked) {
//         toast.error("Your account has been blocked. please contact admin.");
//         return;
//       }

//       localStorage.setItem("currentUser", JSON.stringify(user));
//       localStorage.setItem("token", token);
//       localStorage.setItem("isLoggedIn", "true");

//      if (user.isAdmin) {
//         toast.success("Welcome Admin!");
//         navigate("/admin");
//       } else {
//         toast.success("Login successful!");
//         navigate("/home");
//       }

//     } catch (err) {
//       console.error(err);
//       const message = err.response?.data?.message || "Something went wrong. please try again";
//       setError({ general: message });
//       toast.error(message);
//     }

//   }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }
//   //  validation---
//   const validate = () => {
//     const newErrors = {};
//     if (!form.email) newErrors.email = "Email is required";
//     if (!form.password) newErrors.password = "Password is  required";
//     else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
//     return newErrors;
//   }

//   return (
//     <div className='flex justify-center items-center h-screen bg-gray-50'>
//       <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-md w-96'>
//         <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
//         <input
//           type='email'
//           name="email"
//           placeholder='Email'
//           className='w-full mb-4 p-2 border rounded'
//           value={form.email}
//           onChange={handleChange}
//         />
//         {error.email && (
//           <p className="text-red-800 text-sm">{error.email}</p>
//         )}

//         <input
//           type='password'
//           name='password'
//           placeholder='password'
//           className='w-full mb-4 p-2 border rounded'
//           value={form.password}
//           onChange={handleChange}
//         />
//         {error.password && (
//           <p className="text-red-800 text-sm">{error.password}</p>
//         )}

//         <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Login</button>
//         <p>
//           Don't have an account?{" "}
//           <Link to='/signup' className='text-blue-500 hover:underline'>Sign up</Link>
//         </p>
//       </form>
//     </div>
//   )
// }

// export default Login



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

      if (user.isAdmin) {
        toast.success("Welcome Admin!");
        navigate("/admin");
      } else {
        toast.success("Login successful!");
        navigate("/home");
      }

    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Something went wrong. please try again";
      setError({ general: message });
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  }

  return (
    <div className='flex justify-center items-center h-screen bg-[#fcfcfc]'>
      <div className='bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-gray-100'>
        <div className="text-center mb-10">
          <h2 className='text-3xl font-black mb-2 text-gray-900 tracking-tighter'>Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
            <input
              type='email'
              name="email"
              className={`w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all outline-none ${error.email ? 'ring-1 ring-red-400' : ''}`}
              value={form.email}
              onChange={handleChange}
            />
            {error.email && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">{error.email}</p>
            )}
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Password</label>
            <input
              type='password'
              name='password'
              className={`w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all outline-none ${error.password ? 'ring-1 ring-red-400' : ''}`}
              value={form.password}
              onChange={handleChange}
            />
            {error.password && (
              <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">{error.password}</p>
            )}
          </div>

          <button className='w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-600 transition-all duration-300 shadow-xl shadow-gray-200 active:scale-95'>
            login
          </button>
          
          <div className="text-center mt-8">
            <p className="text-sm font-medium text-gray-500">
              Don't have an account?{" "}
              <Link to='/signup' className='text-pink-600 font-black hover:underline tracking-tight ml-1'>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
