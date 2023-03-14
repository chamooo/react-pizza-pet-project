import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: 0,
    items: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState, // значення за замовчуванням

    reducers: {
        // дії

        addItem(state, action) {
            const foundItem = state.items.find((obj) => obj.id === action.payload.id);
            if (foundItem) {
                foundItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        minusItem(state, action) {
            const foundItem = state.items.find((obj) => obj.id === action.payload);
            if (foundItem) {
                foundItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        clearCart(state, action) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions; // витягуємо методи з reducers
export default cartSlice.reducer;
