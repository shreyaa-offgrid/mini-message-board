const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const {indexRouter} = require("./routes/indexRouter");
const newMessageRouter = require("./routes/newMessageRouter")
const viewMessageRouter = require("./routes/viewMessageRouter")

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/new', newMessageRouter);
app.use('/message', viewMessageRouter)

const port = 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});