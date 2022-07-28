const express = require('express');
const { getFavourites, postFavourites, getUserExists } = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

router.post('/user/:username', postFavourites);

router.get('/user/:username', getUserExists);

router.get('/user/favourites/:username', getFavourites);

module.exports = router;