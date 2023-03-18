import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    items: [],
    status: 'loading', 
};
export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus",async (params) => {
    const { currentPage, categoryId, sortType, searchValue } = params;
    const url =
    `https://63fb43527a045e192b65f0fd.mockapi.io/items?` +
    `page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}` +
    `&sortBy=${sortType.property}&order=${sortType.order}${
        searchValue.length ? `&search=${searchValue}` : ''
    }`;
    const { data } = await axios.get(url);

    return data;
})
const pizzaSlice = createSlice({
    name: 'items',
    initialState, // значення за замовчуванням

    reducers: {
        // дії
        setItems(state, action) {
            state.items = action.payload;
        } 
    },
    
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        },
    }
});

export const { setItems } = pizzaSlice.actions; // витягуємо методи з reducers
export default pizzaSlice.reducer;
