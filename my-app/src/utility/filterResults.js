// To be changed as more filter option become available
export const shouldBeFiltered = (info, filter) => {
    const incorrectGenre = !info.genres.includes(filter.genre) && filter.genre !== 'all';
    const isExplicit = !filter.showExplicit && info.isExplicit;
    return incorrectGenre || isExplicit;
};