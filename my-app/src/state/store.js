import { configureStore } from '@reduxjs/toolkit';
import playablePlaylistReducer from './slices/playablePlaylist/playablePlaylistSlice';
import playerConfigReducer from './slices/playerConfig/playerConfigSlice';
import filterReducer from './slices/filterSlice';
import viewReducer from './slices/viewSlice';

export const store = configureStore({
  reducer: {
    playablePlaylist: playablePlaylistReducer,
    playerConfig: playerConfigReducer,
    filter: filterReducer,
    view: viewReducer
  },
});