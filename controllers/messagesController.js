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
  const messages = await db.getAllMessages();
  res.render('index', 
    {title: "Mini Messageboard", messages})
}

function newMessageGet(req, res) {
  res.render('form');
}

const newMessagePost = [
  validateMessage,
  async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors.array());
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
      console.log(err);
      res.status(500).send('Aw snap. Something went wrong on the server')
    }
    res.redirect('/');
  }
]

async function messageByIdGet(req, res) {
  const id = req.params.id;
  const message = await db.getMessage(id);
  if(message===null) return res.send(`No message with id ${id} exists`)
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