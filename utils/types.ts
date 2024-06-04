export interface Product {
    id:number,
    name:string,
    price:number,
}

export interface CartProduct {
    id:number,
    quantity:number,
    name:string,
    price:number,
    totalPrice:number,
}