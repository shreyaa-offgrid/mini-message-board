const {Router}  = require('express');
const indexRouter = Router();
const messagesController = require('../controllers/messagesController');

indexRouter.get('/', messagesController.getMessages);
indexRouter.get('/new', messagesController.newMessageGet);
indexRouter.post('/new', messagesController.newMessagePost);
indexRouter.get('/message/:id', messagesController.messageByIdGet);
indexRouter.post('/message/:id/delete', messagesController.deleteMessagePost);
indexRouter.post('/delete', messagesController.deleteAllMessagesPost);
module.exports = indexRouter;