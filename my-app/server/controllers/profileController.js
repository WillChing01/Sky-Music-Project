const { checkUsernameCharacters } = require("../utility/validate");
const Favourites = require("../models/Favorites");
const User = require("../models/User");

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
    const userFavs = await getFavouritesByUser(username);
    const hasNoFavs = !userFavs || !userFavs.favourites.length;
    if (hasNoFavs) {
        res.status(200).json({
            favourites: [null]
        });
    } else {
        res.status(200).json({
            favourites: userFavs.favourites
        });
    }
};


const makeFavourites = async (username, trackId) => {
    await Favourites.create({
        user: username,
        favourites: [trackId]
    });
};

const addFavourite = async (trackId, favs) => {
    favs.favourites.push(trackId);
    await favs.save();
};

const unfavourite = async (trackId, favs) => {
    const grabbedIndex = favs.favourites.indexOf(trackId);
    const isTrackInFavs = grabbedIndex !== -1;
    if (isTrackInFavs) favs.favourites.splice(grabbedIndex, 1);
    await favs.save();
};

const postFavourites = async (req, res) => {
    const { username, favourited, trackId } = req.body;

    try {
        checkUsernameCharacters(username);
        await checkUserExists(username);

        const userFavs = await getFavouritesByUser(username);
        const hasMadeFavs = !!userFavs;

        if (!hasMadeFavs) {
            if (favourited) {
                await makeFavourites(username, trackId);
            }
        } else {
            if (favourited) {
                await addFavourite(trackId, userFavs);
            } else {
                await unfavourite(trackId, userFavs);
            }
        }
        res.status(200).json({trackId});

    } catch(err) {
        res.status(401).json({
            error: err.message
        });
    }
};

module.exports = {
    getUserExists,
    getFavourites,
    postFavourites
};
