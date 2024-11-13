const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

router.post('/', directorController.addDirector);
router.put('/:directorId', directorController.updateDirector);
router.delete('/:directorId', directorController.deleteDirector);
router.get('/:directorId', directorController.getDirectorById);
router.get('/', directorController.listDirectors);

module.exports = router;
