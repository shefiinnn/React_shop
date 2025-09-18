import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import Header from "./Navbar.jsx";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const baseURL = "https://api.escuelajs.co";
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`${baseURL}/api/v1/products/${id}`);
        const data = await res.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!product) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center"><p>Product not found.</p></div>;
  }
  const handleaddToCart = () => {
    toast.success("Product added to cart!");
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => navigate(-1)} 
            variant="bordered"
            startContent={<ChevronLeft size={16} />}
            className="text-white border-neutral-700"
          >
            Back
          </Button>
        </div>       
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-start">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 order-2 md:order-1">
              {product.images.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    activeImage === img ? "border-violet-500" : "border-neutral-700"
                  }`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
            <div className="order-1 md:order-2">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full max-w-lg object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <span className="inline-block bg-neutral-800 text-white text-sm px-3 py-1 rounded-full w-fit">
              {product.category.name}
            </span>
            <p className="text-neutral-300">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-neutral-400">Price</p>
                <p className="text-3xl font-bold">
                  ${Number(product.price).toLocaleString()}
                </p>
              </div>
              <Button onClick={handleaddToCart}
              className="bg-violet-600 text-white font-bold text-lg px-8 py-6 rounded-lg hover:bg-violet-700">
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
