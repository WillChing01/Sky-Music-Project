import { configureStore } from '@reduxjs/toolkit';
import playerInfoReducer from "./slices/playerInfoSlice";
import filterReducer from './slices/filterSlice';
import viewReducer from './slices/viewSlice';

export const store = configureStore({
  reducer: {
    playerInfo: playerInfoReducer,
    filter: filterReducer,
    view: viewReducer
  },

});