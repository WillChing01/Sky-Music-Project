function checkIsInfoMissing(...info) {
    for (const infoItem of info) {
        if (!infoItem) {
            throw Error('All fields must be filled in.');
        } 
    }
}

module.exports = {
    checkIsInfoMissing
};