const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.post('/', actorController.addActor);
router.put('/:actorId', actorController.updateActor);
router.delete('/:actorId', actorController.deleteActor);
router.get('/:actorId', actorController.getActorById);
router.get('/', actorController.listActors);

module.exports = router;
