var createError = require('http-errors');
import express from 'express';
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var oicqRouter = require('./routes/oicq');
const app: express.Application = express();
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,x-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/', express.static(path.join(__dirname, './images/')));

app.use('/', indexRouter);
app.use('/oicq', oicqRouter)
app.listen('4000',()=>{
    console.log(4000)
})

module.exports = app;
