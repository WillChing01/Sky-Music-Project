const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send({"message": "hi"});
})

module.exports = router;