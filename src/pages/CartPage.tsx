
import { useLoaderData, useNavigate } from 'react-router-dom';

import { resolveImage } from '../hooks/useImageMap';
import { useCartStore } from '../hooks/useCartStore';
import { type Product } from '../types/Product';

function CartPage() {
  const navigate = useNavigate();

  // Use shopping cart hooks
  const {
    items, incrementQuantity, decrementQuantity, removeItem, clearCart
  } = useCartStore();

  // Handle empty cart
  if (items.length === 0) {
    console.log('Cart is empty');
    return (
      <>
        <div className="px-6 py-4">
          <h1 className="mb-4 text-2xl font-semibold text-center text-slate-600">Shopping Cart</h1>
          <div>
            <p className="text-lg text-gray-700">Your cart is empty.</p>
          </div>
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

  // Compute shopping cart total
  const total = cartProducts.reduce((sum, { product, quantity }) => {
    return sum + (product?.price ?? 0) * quantity;
  }, 0);

  return (
    <>
      <div className="px-6 py-4">
        <h1 className="mb-4 text-2xl font-semibold text-center text-slate-600">Shopping Cart</h1>

        <div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded cursor-pointer"
            onClick={() => clearCart()}
          >
            Clear cart
          </button>
        </div>

        <div className="mb-4">
          {cartProducts.map(({ productId, quantity, product }) => {
            if (!product) return null;

            return (
              <div key={productId} className="flex items-center gap-4 mt-2">
                <div className="col-span-1">
                  <img className="w-10 h-10 rounded-sm cursor-pointer" src={resolveImage(product.img)} alt={product.name} />
                </div>
                <div className="">{product.name}</div>               
                <div className="">${product.price.toFixed(2)}</div>
                <div className="">Qty {quantity}</div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                  onClick={() => incrementQuantity(productId)}
                >
                  +1
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                  onClick={() => decrementQuantity(productId)}
                >
                  -1
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
                  onClick={() => removeItem(productId)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <div>
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </>
  );
}

export default CartPage;
