import { configureStore } from '@reduxjs/toolkit';
import playablePlaylistReducer from './slices/playablePlaylist/playablePlaylistSlice';
import playerConfigReducer from './slices/playerConfig/playerConfigSlice';
import filterReducer from './slices/filter/filterSlice';
import viewReducer from './slices/view/viewSlice';
import profileInfoReducer from './slices/profileInfo/profileInfoSlice';

export const store = configureStore({
  reducer: {
    playablePlaylist: playablePlaylistReducer,
    playerConfig: playerConfigReducer,
    filter: filterReducer,
    view: viewReducer,
    profileInfo: profileInfoReducer
  },
});