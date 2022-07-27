const toggleIsLoggedIn = (state) => {
    state.isLoggedIn = !state.isLoggedIn;
};

const toggleFavouriteTrack = (state, { payload }) => {
    const tracks = state.favourites;
    var trackIndex = tracks.indexOf(payload.id);
    if (trackIndex !== -1) {
        tracks.splice(trackIndex, 1);
    } else {
        tracks.push(payload.id);
    }
}

const reducers = {
    toggleIsLoggedIn,
    toggleFavouriteTrack
};

export default reducers;