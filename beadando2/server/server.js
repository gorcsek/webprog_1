var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
	  createError = require('http-errors'),
	  middleware = require('./middleware');

mongoose.connect("mongodb+srv://gmwebprog:vHBu6XsYY8ACE20J@cluster0-mfzbq.mongodb.net/webprog", {useNewUrlParser: true,useUnifiedTopology: true }).then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);
var Money = require('./models/Money');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var login = require('./controllers/Login');
var money = require('./controllers/Money');

var port = process.env.PORT || 4000;
app.set('port', port);
app.listen( port, ()=>{
        console.log('Listening on port ' + port);
});


var router = express.Router();

app.use('/api/money', middleware.checkToken, money);
app.use('/api/login', login);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});