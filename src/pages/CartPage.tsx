
import { useLoaderData } from 'react-router-dom';

import { useCartStore } from '../hooks/useCartStore';
import { type Product } from '../types/Product';

function CartPage() {
  // Use shopping cart hooks
  const {
    items, incrementQuantity, decrementQuantity, removeItem, clearCart
  } = useCartStore();

  // Handle empty cart
  if (items.length === 0) {
    console.log('Cart is empty');
    return (
      <>
        <div>
          The cart is empty
        </div>
      </>
    );
  }

  // Load product data (no assumption of application state)
  const products = useLoaderData<Product[]>();

  // Merge product data with shopping cart
  const cartProducts = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }));
  console.log(cartProducts);

  // const subTotal = cartProducts.reduce((sum, { product, quantity }) => {
  //   return sum + (product?.price ?? 0) * quantity;
  // }, 0);

  return (
    <>
      <div>
        {cartProducts.map(({ productId, quantity, product }) => {
          if (!product) return null;
          return (
            <div key={productId}>
              <p>{product.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CartPage;
