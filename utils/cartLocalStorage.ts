import { CartProduct } from "./types"

export const saveCartProductToLS = (product: CartProduct[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(product));
      }
}

export const getCartProductsFromLS = () => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          return JSON.parse(storedCart);
        }
      }
      return [];
}