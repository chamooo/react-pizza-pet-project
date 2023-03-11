import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярністю (за спаданням)',
        property: 'rating',
        order: 'asc',
    },
    currentPage: 1,
}
const filterSlice = createSlice({
    name: "filters",
    initialState, // значення за замовчуванням

    reducers: { // дії
        setCategoryId(state, action) {
            // що змінювати  -  що передавати
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    }
});

export const {setCategoryId, setSort, setCurrentPage} = filterSlice.actions; // витягуємо методи з reducers
export default filterSlice.reducer;