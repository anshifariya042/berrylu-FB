import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ FIXED mapper
// export const mapId = (item) => {
//   if (Array.isArray(item)) {
//     return item.map((i) => ({
//       ...i,
//       id: i._id,
//     }));
//   }

//   return {
//     ...item,
//     id: item._id,
//     name: item.fullName,
//   };
// };

export const mapId = (item) => {
  if (Array.isArray(item)) {
    return item.map(mapId);
  }

  return {
    ...item,
    id: item._id,
    name: item.fullName || item.name, // ✅ works for BOTH users & products
  };
};


export default api;
