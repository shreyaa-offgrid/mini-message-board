require('dotenv').config();

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const morgan = require('morgan');
const indexRouter = require("./routes/indexRouter");

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});