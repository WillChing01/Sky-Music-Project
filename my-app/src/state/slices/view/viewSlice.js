import { createSlice } from '@reduxjs/toolkit';
import reducers from './viewReducer';

const grid = 'grid';

const initialState = {
    value: grid
};

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers
});

export const { toggleView } = viewSlice.actions;
export default viewSlice.reducer;