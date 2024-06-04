"use client"
import ProductCard from '@/components/ProductCard';
import { useCartStore } from '@/store/useCartStore';
import dynamic from 'next/dynamic';
import React from 'react'

const Cart = () => {
    const { products: cartProducts, getTotalCount } = useCartStore();
      // console.log("cartProdut",cartproducts)
  return (
    <>
    <section>

        <h1 className="text-2xl">Cards products list</h1>
        <br />
        <p className='my-2'>Total Amount:{getTotalCount()}</p>
        {cartProducts.length === 0 ? (
          "No cart available"
        ) : (
          <ProductCard products={cartProducts} isCart={true} />
        )}
        
      </section>
    </>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });