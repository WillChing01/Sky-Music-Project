export const truncateStr = (str, charLimit, shouldAddEllipsis) => {
    if (str.length <= charLimit) return str;
    else {
        const truncatedStr = str.slice(0, charLimit);
        const truncatedStrPossiblyWithEllipsis = shouldAddEllipsis ?
                                                 truncatedStr + '...':
                                                 truncateStr;
        return truncatedStrPossiblyWithEllipsis;
    }
};

export const captilizeFirstLetter = (str) => {
    const firstLetter = str.charAt(0);
    const remainingStr = str.slice(1);
    const titleCase = firstLetter.toUpperCase() + remainingStr;
    return titleCase;
};

