// import React, { useMemo } from "react";
// import toast from "react-hot-toast";
// import { useCart } from "../context/CartContext";

// export default function Orders() {
//   const { orders, cancelOrder } = useCart();
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   const handleCancel = async (orderId) => {
//     if (window.confirm("Are you sure you want to cancel this order?")) {
//       await cancelOrder(orderId);
//     }
//   };

//   return (
//     <div className="px-3 md:px-16 pb-5 bg-gray-50 min-h-screen relative z-10">
//       <p className="text-2xl font-bold text-pink-500 mb-10 text-center pb-5 mt-5">
//         Order Details
//       </p>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-600 text-lg">
//           No orders found 🛍️
//         </p>
//       ) : (
//         <div className="space-y-8 max-w-4xl mx-auto">
//           {orders.map((order) => (
//             <div
//               key={order._id || order.id}
//               className="bg-white shadow-md rounded-2xl p-6 border border-gray-100"
//             >
//               {/* Header */}
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 mb-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Order ID:{" "}
//                     <span className="text-gray-600 font-normal">
//                       {order._id || order.id}
//                     </span>
//                   </h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Date: {order.date}
//                   </p>
//                 </div>
//                 <div className="mt-2 sm:mt-0">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${order.status === "cancelled" ? "bg-red-100 text-red-600" :
//                       order.status === "delivered" ? "bg-green-100 text-green-600" :
//                         "bg-blue-100 text-blue-600"
//                     }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>

//               {/* Items */}
//               <div className="space-y-3">
//                 {order.items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center gap-4 border rounded-lg p-3 hover:shadow-sm transition"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded-lg border"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800">{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity} | Size: {item.size}
//                       </p>
//                     </div>
//                     <p className="font-semibold text-pink-600 text-sm">
//                       ₹{item.newPrice || item.price}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Footer */}
//               <div className="flex justify-between items-center mt-5  pt-4 border-t">
//                 <p className="font-semibold text-gray-700 text-lg">
//                   Total:{" "}
//                   <span className="text-pink-600">₹{order.totalAmount || order.total}</span>
//                 </p>
//                 {order.status === "pending" && (
//                   <button
//                     onClick={() => handleCancel(order._id || order.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md transition"
//                   >
//                     Cancel Order
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Orders() {
  const { orders, cancelOrder } = useCart();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleCancel = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await cancelOrder(orderId);
    }
  };

  return (
    <div className="px-4 md:px-16 pt-24 pb-20 bg-[#fcfcfc] min-h-screen relative z-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <p className="text-3xl font-black text-pink-600 tracking-tighter">
          ORDER HISTORY
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <p className="text-gray-400 text-xl font-medium mb-2">No orders found 🛍️</p>
          <p className="text-gray-300 text-sm italic">Your future favorites are waiting in the shop.</p>
        </div>
      ) : (
        <div className="space-y-10 max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white shadow-xl shadow-gray-100/50 rounded-[2.5rem] p-8 border border-gray-50 overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-6 mb-6 border-b border-gray-50">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Order ID
                  </h3>
                  <p className="text-sm font-bold text-gray-800 font-mono mt-1">
                    #{order._id || order.id}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium italic">
                    Placed on: {order.date}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === "cancelled" ? "bg-red-50 text-red-500" :
                    order.status === "delivered" ? "bg-emerald-50 text-emerald-600" :
                    "bg-pink-50 text-pink-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 p-4 rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded-2xl shadow-sm border border-white"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-black text-gray-800 tracking-tight">{item.name}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter mt-1">
                        Qty: {item.quantity} <span className="mx-2">|</span> Size: {item.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 text-lg">
                        ₹{item.newPrice || item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-50 gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Paid:</span>
                  <p className="font-black text-gray-900 text-3xl tracking-tighter">
                    ₹{order.totalAmount || order.total}
                  </p>
                </div>
                
                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id || order.id)}
                    className="w-full sm:w-auto bg-white border-2 border-red-100 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-2xl transition-all duration-300 active:scale-95"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}