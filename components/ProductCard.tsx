import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { CartProduct, Product } from "@/utils/types";

interface ProductCardProp {
  products: Product[] | CartProduct[];
  isCart: boolean;
}
const ProductCard = ({ products, isCart }: ProductCardProp) => {
  const { addToCart, removeFromCart } = useCartStore();

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {products &&
          products.map((singleproduct: Product | CartProduct) => (
            <Card>
              <CardHeader>
                <CardTitle>{singleproduct.name}</CardTitle>
                {/* {isCart == true ? <CardDescription>Quantity:{(singleproduct as CartProduct)?.quantity ?? '0'}</CardDescription> : ""} */}
                {isCart == true && "quantity" in singleproduct ? (
                  <CardDescription>
                    Quantity:{singleproduct.quantity}
                  </CardDescription>
                ) : (
                  ""
                )}
              </CardHeader>
              <CardContent>
                <p>Price: {singleproduct.price}</p>
                {isCart == true && "totalPrice" in singleproduct ? (
                  <p>TotalPrice: {singleproduct.totalPrice}</p>
                ) : (
                  ""
                )}
              </CardContent>
              <CardFooter>
                {isCart == false ? (
                  <p>
                    <button
                      className="border-2 rounded-md bg-blue-500 p-2 text-white"
                      onClick={() => {
                        addToCart(singleproduct as CartProduct);
                      }}
                    >
                      Add to Cart
                    </button>
                  </p>
                ) : (
                  <p>
                    <button
                      className="border-2 rounded-md bg-red-500 p-2 text-white"
                      onClick={() => {
                        removeFromCart(singleproduct.id);
                      }}
                    >
                      Remove from Cart
                    </button>
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ProductCard;
