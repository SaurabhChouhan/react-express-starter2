import mongoose from 'mongoose'
import express from 'express'
import passport from "passport"
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import apiRouter from './routes/apiRouter';

var app = express()

//view engine setup
app.set('view', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors())

// authentication
require('./auth')
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'build')))

app.use("/", apiRouter)
mongoose.connect('mongodb://localhost:27017/cloud-printing', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, async ctx=>{
    console.log("database connection is successful")
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    console.log("error caught ", err)
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
  
    // returning error in json 
    res.json({ success: false, status: res.status, message: err.message })
  });
app.listen(3002, ()=>{
    console.log("Server Started on 3002");
})
module.exports= app;