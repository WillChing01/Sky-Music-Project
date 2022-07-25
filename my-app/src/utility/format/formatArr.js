export const listArrOfStrsAsStr = (array, separator) => {
    let list = '';
    const arrLength = array.length;
    const lastIndex = arrLength - 1;
    for (let index = 0; index < arrLength; index++) {
        const element = array[index];
        list += element;
        if (index !== lastIndex) {
            list += separator;
        }
    }
    return list;
};

const exchange = (array, i, j) => {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

shuffleArr(Array.fill(trackList.length))

dispatch(setShuffleOrder(getShuffleOrder(trackList)))

export const shuffleArr = (array) => {
    const length = array.length;
    const last = length - 1;
    for (let targetIndex = last; targetIndex >= 0; targetIndex--) {
        const swapIndex = Math.floor(Math.random() * (length));
        exchange(array, targetIndex, swapIndex);
    }
    return array;
};