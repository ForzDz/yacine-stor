declare module '../context/CartContext' {
  import { ReactNode } from 'react';

  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

  interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
  }

  export const CartProvider: React.FC<{ children: ReactNode }>;
  export const useCart: () => CartContextType;
} 