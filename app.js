const config = require('./config')();
const createError = require('http-errors');
const express = require('express');
const db = require('./config/database')
//session
const session = require('express-session');
const SessionStore = require('express-mysql-session');
const flash = require('connect-flash');
const connect = require('connect');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const ejs = require('ejs');
const conn = require("./config/mysql_connect");
//server
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// ----------SESSION--------------//
app.use(flash());
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new SessionStore(db.confige),
    resave: false,
    saveUninitialized: true
}))


app.use( (req, res, next) => {
    res.io = io;
    io.session = req.session
    next();
});



app.use('/',require('./controller/index'))
app.use('/login', require('./controller/login'));
app.use('/register', require('./controller/register'));
app.use('/feed', require('./controller/feed'));
app.use('/profile', require('./controller/profile'));
app.use('/user', require('./controller/user'));
app.use('/post', require('./controller/post_controller'));
app.use('/follower', require('./controller/follower_controller'));
app.use('/camera', require('./controller/camera'));


// --------------catch 404 and forward to error handler-------------------//

app.use(function(req, res, next) {
    next(createError(404));
});





// ---------------error handler------------------------//
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});





server.listen(config.port, function(){
    console.log('Express server listening on port ' + config.port);
});


//------ADD USER SOCKET--------//

global.clients = {}
require('./module/socket_user')(io,clients);


//------ADD USER SOCKET--------//


//
// var io1 = io.of('/add_user')
// io1.on('connection', function (socket) {
//     socket.on('add-user', function(data){
//         clients[data.username] = {
//             "socket": socket.id
//         };
//         console.log(clients)
//     });
//     console.log("connected 1 --- "+socket.id);
// });


//------SOCKET--------//



// server.listen(config.port, function(){
//     console.log('Express server listening on port ' + config.port);
// });

// module.exports = app;
