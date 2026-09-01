const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');

const validateMessage = [
  body('username').trim()
    .isLength({min:1, max:100}).withMessage("Username must be between 1 and 100 characters")
    .matches(/^[a-zA-Z][a-zA-Z0-9_]*$/).withMessage("Username should start with a letter, and can only have letters, numbers and underscores"),
  body('text').trim()
    .isLength({min:1, max:500}).withMessage("Message must not exceed 500 characters, and must be at least one character")
]

async function getMessages(req, res){
  try{
    const messages = await db.getAllMessages();
    res.render('index', {title: "Mini Message Board", messages})
  } catch(err){
    console.error(err);
    res.status(500).send('Unable to retrieve messages')
  }
}

function newMessageGet(req, res) {
  res.render('form');
}

const newMessagePost = [
  validateMessage,
  async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400)
        .render('form', {
          errors: errors.array(),
          message:req.body,
        });
    }
    const {username, text} = matchedData(req);
    
    try{
      await db.createMessage(username, text);
      res.redirect('/');
    } catch(err){
      console.error(err);
      res.status(500).send('Aw snap. Something went wrong.')
    }
  }
]

async function messageByIdGet(req, res) {
  const id = req.params.id;
  try {
    const message = await db.getMessage(id);
    if(message===null){
      return res.status(404)
      .send(`No message with id ${id} exists`)
    }
    res.render('message', {message})
  } catch(err){
    console.error(err);
    res.status(500).send('Unable to retrieve message.');
  }
}

async function deleteAllMessagesPost(req, res) {
  try {
    await db.deleteAllMessages();
    res.redirect('/');
  } catch(err){
    console.error(err);
    res.status(500).send('Unable to delete messages.');
  }
}

async function deleteMessagePost(req, res) {
  const id = req.params.id;

  try {
    const deleted = await db.deleteMessage(id);

    if (!deleted) {
      return res.status(404)
        .send(`No message with id ${id} exists`);
    }
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to delete message.');
  }
}

module.exports = {
  getMessages, newMessageGet, 
  newMessagePost, messageByIdGet, 
  deleteAllMessagesPost, deleteMessagePost
}