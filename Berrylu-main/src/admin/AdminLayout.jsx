// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { HiOutlineMenuAlt2 } from "react-icons/hi";

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-50 text-gray-800">
//       {/* Sidebar */}
//       <div
//         className={`fixed md:static inset-y-0 left-0 z-50 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out`}
//       >
//         <Sidebar closeSidebar={() => setSidebarOpen(false)} />
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="md:hidden mb-4 text-2xl text-pink-600"
//         >
//           <HiOutlineMenuAlt2 />
//         </button>

//         <Outlet />
//       </main>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 transform shadow-2xl md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-300 ease-out border-r border-slate-200 bg-white`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Top Navigation Bar (Mobile Only) */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 md:hidden">
          <div className="flex items-center gap-3">
             <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-pink-600 transition-colors"
            >
              <HiOutlineMenuAlt2 size={26} />
            </button>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Admin
            </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none scroll-smooth">
          <div className="max-w-[1600px] mx-auto p-6 md:p-10 lg:p-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}