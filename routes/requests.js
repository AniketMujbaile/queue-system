const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, requestController.enqueueRequest);

module.exports = router;
