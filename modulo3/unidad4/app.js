var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'ahdjkcmwwieopsjdkftch',
  resave: false,
  saveUninitialized: true
}));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

/*EJERCICIO 1*/

app.get('/', function(req, res) {
  var conocido = Boolean(req.session.nombre);

  res.render('index', {
    title: 'Sesiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

app.post('/ingresar', function(req, res) {
  // replace() para reemplazar espacios en blanco por vacíos (evitar el ingreso de espacios)
  let procesado = req.body.nombre.replace(/\s+/g, '')
  if(procesado){
    req.session.nombre = req.body.nombre
  }
  res.redirect('/');
});

app.get('/salir', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

/*EJERCICIO 2*/
app.use(function(req, res, next) {
  //crear el objeto vacío si no existe la variable de sesion vistas.
  if(!req.session.vistas){
    req.session.vistas = {};
  }

  //buscar una clave dentro de session.vistas que coincida con la url actual.
  //si no existe, inicializar. si existe, incrementar
  if(!req.session.vistas[req.originalUrl]){
    req.session.vistas[req.originalUrl] = 1;
  }
  else {
    req.session.vistas[req.originalUrl]++;
  }

  console.log('Vistas: ' + req.session.vistas);

  next();
});

app.get('/nosotros', function(req, res){
  //pasar al template la variable vistas.
  res.render('pagina', {
    nombre: 'nosotros',
    vistas: req.session.vistas[req.originalUrl]
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
