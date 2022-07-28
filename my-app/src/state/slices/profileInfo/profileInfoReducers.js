const toggleFavouriteTrack = (state, { payload }) => {
    const tracks = state.favourites;
    const trackIndex = tracks.indexOf(payload.id);
    if (trackIndex !== -1) {
        tracks.splice(trackIndex, 1);
    } else {
        tracks.push(payload.id);
    }
}

const setFavourites = (state, { payload }) => {
    state.favourites = payload.favourites;
}

// const toggleDarkMode = (state) => {
//     state.darkMode = !state.darkMode;
// }

const reducers = {
    toggleFavouriteTrack,
    setFavourites
    //toggleDarkMode
};

export default reducers;