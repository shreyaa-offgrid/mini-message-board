const {Router} = require('express')
const viewMessageRouter = Router()
const {messages} = require('./indexRouter')

viewMessageRouter.get('/:id', (req, res)=>{
  const id = req.params.id;
  const message = messages.find(msg => msg.id == id)
  res.render('message', {message})
})

 
module.exports = viewMessageRouter