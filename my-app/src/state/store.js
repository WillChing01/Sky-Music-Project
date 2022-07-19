import { configureStore } from '@reduxjs/toolkit';
import playerInfoReducer from "./slices/playerInfoSlice";
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    playerInfo: playerInfoReducer,
    filter: filterReducer
  },

});