"use client";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ProductCard from "@/components/ProductCard";
import dynamic from "next/dynamic";
import { CartIcon } from "@/components/Svg";
import Link from "next/link";

const Dashboard = () => {
  const { logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const {getCount} = useCartStore();
// console.log("count:",getCount());

  useEffect(() => {
    const token = Cookies.get("token");
    router.push("/dashboard");
    if (!token) {
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, logout]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  const productsList = [
    { id: 1, name: "Mobile", price: 100 },
    { id: 2, name: "Desktop", price: 200 },
    { id: 3, name: "Laptop", price: 300 },
  ];
  return (
    <>
      <h1 className="text-4xl my-4">Dashboard</h1>

      {/* addingc cart with badge on it */}
      <div className="p-5">
      <Link href="/cart"><strong className="relative inline-flex items-center rounded border border-gray-200 px-2.5 py-1.5 text-xs font-medium">
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 flex justify-center items-center items text-white">
            <span>{getCount()}</span>
          </span>
          <span className="ml-1.5 text-green-700"> <CartIcon/> </span>
        </strong></Link>
      </div>

      <section className="my-5">
        <h1 className="text-2xl">Products:</h1>
        <ProductCard products={productsList} isCart={false} />
      </section>
      
      <button
        onClick={handleLogout}
        className="p-2 bg-red-600 text-white rounded-md m-2"
      >
        Logout
      </button>
    </>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
