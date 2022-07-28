const mongoose = require('mongoose');
const { bcryptHash, bcryptGetMatch } = require('../utility/hash');
const { checkIsInfoMissing, checkUsernameCharacters } = require('../utility/validate');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
    }
});



userSchema.statics.signup = async function(username, password) {
    
    checkUsernameCharacters(username);
    checkIsInfoMissing(username, password);

    const isUsernameTaken = await this.findOne({ username });


    if (isUsernameTaken) throw Error('That username has been taken.')

    const hashedPassword = await bcryptHash(password);

    const user = await this.create({
         username,
         password: hashedPassword
    });

    return user;
};


userSchema.statics.login = async function(username, password) {
    checkIsInfoMissing(username, password);

    const user = await this.findOne({username});

    if (!user) throw Error('No such user exists.')
    else {
        const isPasswordMatch = await bcryptGetMatch(password, user.password);
        if (!isPasswordMatch) throw Error('Incorrect password.');
    } 

    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;

