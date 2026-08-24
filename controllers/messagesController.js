const db = require('../db/queries');

async function getMessages(req, res){
  const messages = await db.getAllMessages();
  res.render('index', 
    {title: "Mini Messageboard", messages})
}

function newMessageGet(req, res) {
  res.render('form');
}

async function newMessagePost(req, res) {
  const {username, text} = req.body;
  await db.createMessage(username, text);
  res.redirect('/')
}

async function messageByIdGet(req, res) {
  const id = req.params.id;
  const message = await db.getMessage(id);
  res.render('message', {message})
}

async function deleteAllMessagesPost(req, res) {
  await db.deleteAllMessages();
  res.redirect('/');
}

module.exports = {
  getMessages, 
  newMessageGet, 
  newMessagePost, 
  messageByIdGet, 
  deleteAllMessagesPost
}