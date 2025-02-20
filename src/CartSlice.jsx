import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], 
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.name === name ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { name, image, cost, quantity: 1 }],
        };
      }
    },
    removeItem: (state, action) => {
      return {
        ...state,
        items: state.items.filter(item => item.name !== action.payload),
      };
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.name === name && quantity > 0 ? { ...item, quantity } : item
        ),
      };
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
