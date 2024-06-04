import { create } from "zustand";
import { CartProduct } from "@/utils/types";
import { saveCartProductToLS,getCartProductsFromLS } from "@/utils/cartLocalStorage";

interface CartStore {
    products:CartProduct[],
    addToCart: (product:CartProduct,) => void,
    removeFromCart: (ProductId:number) => void,
    getCount: () => number,
    getTotalCount: () => number,
}

export const useCartStore = create<CartStore>((set,get)=>({
    products:getCartProductsFromLS(),
    addToCart : (product:CartProduct) => set((state)=> {
        const exsitingProductIndex = state.products.findIndex(p => p.id == product.id);
        product.totalPrice = product.price;
        if(exsitingProductIndex >= 0){
            const updatedCart = [...state.products];
            updatedCart[exsitingProductIndex].quantity += 1; 
            updatedCart[exsitingProductIndex].totalPrice += product.price;
            saveCartProductToLS(updatedCart);
            return {products:updatedCart};
        } else{
            const updatedCart = [...state.products, {...product, quantity:1}];
            saveCartProductToLS(updatedCart);
            return {products:updatedCart};
        }
        
    }),

    removeFromCart : (productId:number) => set((state)=>{
    // const updatedCart = state.products.filter(product => product.id !== productId);
    const existingProductIndex = state.products.findIndex(product => product.id === productId);

    const updatedCart = [...state.products];
    if (existingProductIndex >= 0) {
      const existingProduct = updatedCart[existingProductIndex];
      
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        existingProduct.totalPrice -= existingProduct.price;
      } else {
        updatedCart.splice(existingProductIndex, 1);
      }
    }
    saveCartProductToLS(updatedCart);
    return { products: updatedCart };
    }),
    
    getCount: () => {
        const products = get().products;
        let totalCount = 0;
        for(let i=0; i<products.length; i++) {
            totalCount += products[i].quantity 
        }
        return totalCount;
    },

    getTotalCount : () => {
        const products = get().products;
        let totalCount = 0;
        for(let i=0;i<products.length; i++){
            totalCount += products[i].totalPrice;
        }
        return totalCount;
    }
}))