const config = require('config');
const path = require('path');
const port = process.env.PORT || 3000;

const helmet = require('helmet');

require('express-async-errors');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (config.enableAccessLogs) {
  app.use(morgan('tiny'));
}
app.use(helmet());
app.use(express.static('public'));

require('./routes/index')(app);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
