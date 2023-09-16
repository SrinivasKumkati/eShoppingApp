var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require("http");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var os = require("os");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newSignupRouter = require("./routes/newSignup");
var getProductDetails = require("./routes/getProductDetails")
var addProductDetails = require("./routes/addProductData");
var validateUserCredentialsRouter = require("./routes/userCredentialsValidator");
var uploadResourceRouter = require("./routes/uploadresource");
var checkUserLoginRouter = require("./routes/checkUserLogin");
var logoutUser = require("./routes/logoutUser");
const { Server } = require("socket.io");
const numCPUs = os.availableParallelism();
var cluster = require("cluster");
console.log("numCPUs -> " + numCPUs);
console.log(cluster.isMaster);
var count = 0;
var app = express();
var io, myServer;
if (cluster.isMaster) {
  for (var i = 0 ;i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  io = new Server(myServer);
  myServer = http.createServer(app);
  myServer.listen(3000, () => {
    console.log("server is listing to 3000 at process " + process.pid);
  }) 
}



/*
io.on('connection', (socket) => { // method gets fired automatically when user connects to server
  count++;
//   console.log("Total no of users connected -> " + count);
  socket.on('disconnect', () => { // Callback event gets fired while client gets disconnected
    count--;
    //console.log('Total no of users connected ' + count);
  });
  socket.on("sendingMsg", (data) => {
    console.log(data);
    socket.broadcast.emit("receiveMsg", data); //publshing data to other users, other than the sender

    //socket.broadcast.emit('receivingmsg', data);
  })
});
*/
app.use(session({ secret: 'asjkfhaksjdfh', cookie: { maxAge: 60000 }}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userLoginData/validation', validateUserCredentialsRouter);
app.use("/new/user/signup", newSignupRouter);
app.use("/get/productDetails", getProductDetails);
app.use("/add/productData", addProductDetails);
app.use("/upload/resource", uploadResourceRouter);
app.use("/check/isLoggedin", checkUserLoginRouter);
app.use("/logoutuser", logoutUser);




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
