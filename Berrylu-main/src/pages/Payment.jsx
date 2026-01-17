// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function Payment() {
//   const { cart, clearCart, getCartTotal, placeOrder } = useCart();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     paymentMethod: "cod",
//     cardNumber: "",
//     cardName: "",
//     expiry: "",
//     cvv: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const total = getCartTotal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.address || !form.phone) {
//       toast.error("Please fill all shipping details!");
//       return;
//     }

//     toast.loading("Processing order...", { id: "pay" });

//     const success = await placeOrder({
//       address: form.address,
//       phone: form.phone,
//       name: form.name
//     }, form.paymentMethod);

//     toast.dismiss("pay");
//     if (success) {
//       navigate("/thankyou");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 pt-24 pb-10 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* LEFT SIDE - Shipping Details */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-md rounded-lg p-6 space-y-5"
//         >
//           <h2 className="text-2xl font-semibold text-pink-600">
//             Shipping Address
//           </h2>

//           <div>
//             <label className="block text-sm font-medium">Full Name</label>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               className="w-full border rounded p-2 mt-1"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Address</label>
//             <textarea
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//               placeholder="House No, Street, City, PIN"
//               rows={3}
//               className="w-full border rounded p-2 mt-1"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Phone Number</label>
//             <input
//               type="number"
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//               placeholder="+91 XXXXX XXXXX"
//               className="w-full border rounded p-2 mt-1"
//             />
//           </div>

//           <h3 className="text-lg font-semibold mt-6">Payment Method</h3>

//           <div className="flex flex-col gap-3">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="cod"
//                 checked={form.paymentMethod === "cod"}
//                 onChange={handleChange}
//               />
//               Cash on Delivery
//             </label>

//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="card"
//                 checked={form.paymentMethod === "card"}
//                 onChange={handleChange}
//               />
//               Credit / Debit Card
//             </label>

//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="upi"
//                 checked={form.paymentMethod === "upi"}
//                 onChange={handleChange}
//               />
//               UPI / Google Pay
//             </label>
//           </div>

//           {/* CONDITIONAL PAYMENT FIELDS */}
//           {form.paymentMethod === "card" && (
//             <div className="mt-4 space-y-3">
//               <input
//                 name="cardNumber"
//                 value={form.cardNumber}
//                 onChange={handleChange}
//                 placeholder="Card Number"
//                 className="w-full border rounded p-2"
//               />
//               <input
//                 name="cardName"
//                 value={form.cardName}
//                 onChange={handleChange}
//                 placeholder="Name on Card"
//                 className="w-full border rounded p-2"
//               />
//               <div className="flex gap-3">
//                 <input
//                   name="expiry"
//                   value={form.expiry}
//                   onChange={handleChange}
//                   placeholder="MM/YY"
//                   className="w-1/2 border rounded p-2"
//                 />
//                 <input
//                   name="cvv"
//                   value={form.cvv}
//                   onChange={handleChange}
//                   placeholder="CVV"
//                   className="w-1/2 border rounded p-2"
//                 />
//               </div>
//             </div>
//           )}

//           {form.paymentMethod === "upi" && (
//             <div className="mt-4">
//               <input
//                 name="upiId"
//                 value={form.upiId}
//                 onChange={handleChange}
//                 placeholder="yourname@upi"
//                 className="w-full border rounded p-2"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
//           >
//             {form.paymentMethod === "cod" ? "Place Order" : "Pay Now"}
//           </button>
//         </form>

//         {/* RIGHT SIDE - Order Summary */}
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             Order Summary
//           </h2>
//           {cart.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty</p>
//           ) : (
//             <ul className="divide-y divide-gray-200 mb-4">
//               {cart.map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex justify-between items-center py-2"
//                 >
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       Qty: {item.quantity} | Size: {item.size}
//                     </p>
//                   </div>
//                   <span className="font-semibold text-pink-600">
//                     ₹
//                     {(
//                       (typeof item.price === "number"
//                         ? item.price
//                         : parseFloat(String(item.price || item.newPrice || 0).replace(/[^0-9.]/g, "")) || 0) *
//                       item.quantity
//                     ).toFixed(2)}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           <div className="border-t pt-4 flex justify-between text-lg font-semibold">
//             <span>Total</span>
//             <span className="text-pink-600">₹{total.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Payment() {
  const { cart, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const total = getCartTotal();

  const [form, setForm] = useState({
    name: "", address: "", phone: "", paymentMethod: "cod",
    cardNumber: "", cardName: "", expiry: "", cvv: "", upiId: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) return toast.error("Complete shipping details!");
    
    toast.loading("Securing your order...", { id: "pay" });
    const success = await placeOrder({ address: form.address, phone: form.phone, name: form.name }, form.paymentMethod);
    toast.dismiss("pay");
    if (success) navigate("/thankyou");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-8 border-b pb-4">Shipping Information</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 ml-1">Full Name</label>
                  <input name="name" 
                  value={form.name}
                   onChange={handleChange} 
                   className="w-full mt-2 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all"  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 ml-1">Phone Number</label>
                  <input type="number" name="phone"
                   value={form.phone} 
                   onChange={handleChange}
                    className="w-full mt-2 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-400 ml-1">Delivery Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="w-full mt-2 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-500 transition-all" placeholder="Apartment, Street, City..." />
              </div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 mt-12 mb-8 border-b pb-4">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {['cod', 'card', 'upi'].map((method) => (
                <label key={method} className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${form.paymentMethod === method ? "border-pink-500 bg-pink-50 text-pink-600" : "border-gray-100 hover:border-gray-200"}`}>
                  <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} className="hidden" />
                  <span className="font-bold uppercase text-xs">{method === 'cod' ? 'Cash' : method}</span>
                </label>
              ))}
            </div>

            {/* Conditional Fields with Animation logic */}
            {form.paymentMethod === 'card' && (
              <div className="animate-in fade-in slide-in-from-top-4 space-y-4">
                <input name="cardNumber" onChange={handleChange} placeholder="Card Number" className="w-full p-4 bg-gray-50 rounded-2xl border-none" />
                <div className="flex gap-4">
                  <input name="expiry" onChange={handleChange} placeholder="MM/YY" className="w-1/2 p-4 bg-gray-50 rounded-2xl border-none" />
                  <input name="cvv" onChange={handleChange} placeholder="CVV" className="w-1/2 p-4 bg-gray-50 rounded-2xl border-none" />
                </div>
              </div>
            )}

            <button type="submit" className="w-full mt-10 bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-pink-100 transition-all transform active:scale-[0.98]">
              {form.paymentMethod === "cod" ? "Confirm Order" : "Proceed to Pay"}
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary (Sticky) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-28">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 mb-6">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                  <div className="flex gap-3">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">₹{((item.newPrice || item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-6 flex justify-between items-center text-2xl font-black">
              <span>Total</span>
              <span className="text-pink-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}