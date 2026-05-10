import { useLocation, useParams } from 'react-router-dom';

import { type Product, isProductsRouteState } from '../types/Product';
import { resolveImage } from '../hooks/useImageMap';
import { useCartStore } from '../hooks/useCartStore';

function ProductPage() {
  // Get specified parameter
  const { productId } = useParams();

  // Get current route
  const { state } = useLocation();

  // Check for no product state
  if (!productId || !isProductsRouteState(state)) {
    return (
      <div className="px-6 py-10">
        <p className="text-xl font-bold text-center text-red-500">No products found</p>
      </div>
    );
  }
  const id = parseInt(productId)

  // Use shopping cart hook
  const { getQuantity, incrementQuantity, decrementQuantity } = useCartStore();
  const quantity = getQuantity(id);

  // Get data from persistent state
  const { products } = state;

  // Get specific product
  const product = products.find((p: Product) => p.id == id);

  return (
    <div className="px-6 py-4 sm:py-6 md:py-8">
      {
        product ? (
          <>
            <h1 className="mb-4 text-2xl font-semibold text-center text-slate-600">Product Details</h1>

            <div className="flex flex-col items-center p-6 bg-white rounded-md">
              <h2 className="mb-2 text-xl font-semibold">{product.name}</h2>
              <p className="text-lg text-gray-700">Price: ${product.price}</p>
              <img className="w-40 h-40 mb-4 rounded-md" src={resolveImage(product.img)} alt={product.name} />

              <p className="text-lg text-gray-700">Quantity: {quantity}</p>
              <div className="flex gap-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => incrementQuantity(id)}
                  aria-label="Increase quantity"
                >
                  +1
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => decrementQuantity(id)}
                  disabled={quantity === 0}
                  aria-label="Decrease quantity"
                >
                  -1
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-xl font-bold text-center text-red-500">No product found</p>
        )
      }
    </div>
  );
}

export default ProductPage;
