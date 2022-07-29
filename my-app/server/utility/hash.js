const bcrypt = require('bcrypt');

const bcryptHash = async function(toHash) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(toHash, salt);
    return hashed;
};

const bcryptGetMatch = async function(candidate, hash) {
    const isMatch = await bcrypt.compare(candidate, hash);
    return isMatch;
};

const bcryptCheckMatch = async function(candidate, hash) {
    const isPasswordMatch = await bcryptGetMatch(candidate, hash);
    if (!isPasswordMatch) throw Error('Incorrect password.');
};

module.exports = {
    bcryptHash,
    bcryptCheckMatch
}