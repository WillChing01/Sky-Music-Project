import { configureStore } from '@reduxjs/toolkit';
import playingInfoReducer from "./slices/playingInfoSlice";
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    playingInfo: playingInfoReducer,
    filter: filterReducer
  },

});