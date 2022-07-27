const User = require('../models/User');
const { createToken } = require('../utility/jwt');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.login(username, password);
        const token = createToken(user._id)
        res.status(200).json({username, token});
    } catch (err) {
        res.status(400).json({
            status: 400,
            statusText: 'Failed to log in user.',
            userMsg: err.message
        });
    }
}

const signup = async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.signup(username, password);
            const token = createToken(user._id)
            res.status(200).json({username, token});
        } catch (err) {
            res.status(400).json({
                status: 400,
                statusText: 'Failed to sign up user.',
                userMsg: err.message
            });
        }
}



  
module.exports = { 
    login,
    signup
}