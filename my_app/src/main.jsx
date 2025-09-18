// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Cookies from "js-cookie"
import ProductDetail from "./components/ProductDetail.jsx";
import { Toaster } from "react-hot-toast";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <div>
          <Toaster/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home"
            element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/products/:id"
            element={Cookies.get("access_token") ? <ProductDetail /> : <Navigate to="/" />} />
        </Routes>
        </div>
      </HeroUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);

