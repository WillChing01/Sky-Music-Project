const Favourites = require("../models/Favorites");
const User = require("../models/User");
const { checkUsernameCharacters } = require("../utility/validate");

const checkUserExists = async (username) => {
    const user = await User.findOne({username});
    if (!user) throw Error('User does not exist');
};

const getUserExists = async (req, res) => {
    const { username } = req.params;
    try {
        await checkUserExists(username);
        res.status(200).json({
            user: username
        });
    } catch (err) {
        res.status(404).json({
            error: err.message
        });
    }
};

const getFavouritesByUser = async (username) => {
    const favourites = await Favourites.findOne({ user: username});
    return favourites;
};

const getFavourites = async (req, res) => {
    const { username } = req.params;

    const userFavourites = await getFavouritesByUser(username);
    if (!userFavourites || !userFavourites.favourites.length) {
        console.log("made it", userFavourites)
        res.status(200).json({favourites: [null]});
    } else {
        console.log('user data')
        res.status(200).json({
            favourites: userFavourites.favourites
        })
    }
};

const postFavourites = async (req, res) => {
    const { username, favourited, trackId } = req.body;

    try {
        checkUsernameCharacters(username);
        await checkUserExists(username);
        const userFavourites = await getFavouritesByUser(username);
        if (!userFavourites && favourited) {
            Favourites.create({
                user: username,
                favourites: [trackId]
            })
        } else if (userFavourites && favourited) {
            userFavourites.favourites.push(trackId);
            await userFavourites.save();
        } else if (userFavourites && !favourited) {
            const trackIndex = userFavourites.favourites.indexOf(trackId);
            if (trackIndex !== -1) {
                userFavourites.favourites.splice(trackIndex, 1);
            }
            await userFavourites.save();
        }
        res.status(200).json({trackId})
    } catch(err) {
        res.status(401).json({
            error: err.message
        })
    }
};

module.exports = {
    getUserExists,
    getFavourites,
    postFavourites
};
