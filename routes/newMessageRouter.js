const { Router } = require('express');
const {messages} = require('./indexRouter')

const newMessageRouter = Router();

newMessageRouter.get('/', (req, res)=>{
  res.render('form');
})

newMessageRouter.post('/', (req, res)=>{
  const msg = req.body;
  messages.push({...msg, added: new Date(),id: messages.length+1} );
  res.redirect('../')
})

module.exports = newMessageRouter