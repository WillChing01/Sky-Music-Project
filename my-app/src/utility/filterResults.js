// To be changed as more filter options become available
export const shouldBeFiltered = (info, filter) => {
    const isOfSelectedGenre = info.genres.includes(filter.genre);
    const isGenreSelected = filter.genre !== 'all'
    const shouldFilterByGenre = isGenreSelected && !isOfSelectedGenre;
    
    const shouldFilterExplicit = !filter.showExplicit;
    const isExplicit = info.isExplicit;
    const shouldFilterByExplicit = shouldFilterExplicit && isExplicit;

    const shouldFilter = shouldFilterByGenre || shouldFilterByExplicit;
    return shouldFilter;
};