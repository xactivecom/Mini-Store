import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Shopping cart type
type CartItem = {
  productId: number;
  quantity: number;
}

// Shopping cart prototype
interface CartStore {
  items: CartItem[];

  // Counts
  getQuantity: (productId: number) => number;
  setQuantity: (productId: number, quantity: number) => void;
  getTotalItems: () => number;

  // Mutations
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Get quantity of specific product within cart
      getQuantity: (productId: number) => {
        return get().items.find((i) => i.productId === productId)?.quantity ?? 0;
      },

      // Set quantity of specific product within cart
      setQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        const existing = get().items.find((i) => i.productId === productId);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity } : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { productId, quantity }],
          }));
        }
      },

      // Get total quantity of products within cart
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // Increase product quantity in cart by 1
      incrementQuantity: (productId: number) => {
        const existing = get().items.find((i) => i.productId === productId);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { productId, quantity: 1 }],
          }));
        }
      },

      // Decrease product quantity in cart by 1
      decrementQuantity: (productId: number) => {
        const existing = get().items.find((i) => i.productId === productId);
        if (!existing) return;

        if (existing.quantity <= 1) {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            ),
          }));
        }
      },

      // Add product to the cart
      addItem: (productId: number) => {
        const existing = get().items.find((i) => i.productId === productId);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { productId, quantity: 1 }],
          }));
        }
      },

      // Remove product from the cart
      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      // Clear the cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
