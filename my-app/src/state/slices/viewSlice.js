import { createSlice } from '@reduxjs/toolkit';

const grid = 'grid';
const list = 'list';

const initialState = {
    value: grid
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        toggleView: (state) => {
            const isCurrentlyGrid = state.value === grid;
            state.value = isCurrentlyGrid ? list : grid;
        }
    }
});

export const { toggleView } = viewSlice.actions;
export default viewSlice.reducer;