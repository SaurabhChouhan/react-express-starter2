import mongoose from 'mongoose'
import express from 'express'
import passport from "passport"
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import publicRouter from "./routes/publicRouter"

var app = express()

//view engine setup
app.set('view', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors())
// app.use(async (ctx)=>{
//     console.log("First")
// });

app.use(express.static(path.join(__dirname, 'build')))

app.use("/public", publicRouter)
mongoose.connect('mongodb://localhost:27017/cloud-printing', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, async ctx=>{
    console.log("database connection is successful")
})

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
app.listen(3000, ()=>{
    console.log("Server Started on 3000");
})
module.exports= app;