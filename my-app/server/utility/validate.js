function checkIsInfoMissing(...info) {
    for (const infoItem of info) {
        if (!infoItem) {
            throw Error('All fields must be filled in.');
        } 
    }
}

const checkUsernameCharacters = (username) => {
    const regex = /^[A-Za-z0-9]+$/
    const checksOut = regex.test(username);
    console.log(checksOut);
    if (!checksOut) throw Error('Your username contains forbidden characters.');
};

module.exports = {
    checkIsInfoMissing,
    checkUsernameCharacters
};