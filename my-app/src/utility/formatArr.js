export const listArrOfStrsAsStr = (array) => {
    let list = '';
    const arrLength = array.length;
    const lastIndex = arrLength - 1;
    for (let index = 0; index < arrLength; index++) {
        const element = array[index];
        list += element;
        if (index !== lastIndex) {
            list += ', ';
        }
    }
    return list;
};