const grid = 'grid';
const list = 'list';

const toggleView = (state) => {
    const isCurrentlyGrid = state.value === grid;
    state.value = isCurrentlyGrid ? list : grid;
};

const reducers = {
    toggleView
};

export default reducers;