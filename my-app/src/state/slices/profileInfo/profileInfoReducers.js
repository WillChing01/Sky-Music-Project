const toggleIsLoggedIn = (state) => {
    state.isLoggedIn = !state.isLoggedIn;
};

const reducers = {
    toggleIsLoggedIn
};

export default reducers;