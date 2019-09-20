import express from 'express'
import passport from 'passport'
import UserModel from "../models/userModel";
import GalleryModel from '../models/galleryModel';

let publicRouter = express.Router({ mergeParams: true })

//get all users
publicRouter.get('/', async (req, res, next) => {
    console.log("hello user")
    let user = await UserModel.getAllUsers()
    res.status(200).send({
        succes: true,
        payload: user
    })
    next()
})
publicRouter.post('/register', async (req, res, next) => {
    let user = await UserModel.createUser(req.body);
    console.log(user)
    if (user._id)
        res.status(200).send({
            success: true,
            payload: user
        })
    else {
        res.send({
            success: false,
            error: user
        })
    }
    next();
})
publicRouter.post("/login", passport.authenticate('local'), async (req, res, next) => {

    // publicRouter.post("/login", async (req, res, next) => {
    console.log("Inside /login", req.user);
    // let user = await UserModel.verifyUser(req.body);
    console.log("user", req.isAuthenticated())
    req.login(req.user, loginErr => {
        if (loginErr) {
            return next(loginErr);
        }
        res.payload= req.user
    });
    next();
})


//  add-url, get-url and get-url-by-date all apis are also written in galleryRouter.js
publicRouter.post('/add-url', async (req, res, next) => {
    console.log("Inside /gallery", req.body);
    let add = await GalleryModel.addImages(req.body);
    if (add) {
        res.status(200).send({
            success: true,
            payload: add
        })
    }
    res.send({
        success: false
    })
    next();
})
//gallery for mobile users
publicRouter.get("/get-url/:userId/:limit", async (req, res, next) => {
    console.log("Inside /images ", req.params);
    let imgArr;
    if (req.params.limit === "all")
        imgArr = await GalleryModel.getImages(req.params.userId, req.params.limit);

    else if (parseInt(req.params.limit) !== NaN)
        imgArr = await GalleryModel.getImages(req.params.userId, parseInt(req.params.limit));
    if (imgArr.length > 0)
        res.send({
            success: true,
            payload: imgArr
        })
    else
        res.send({
            succes: false,
            error: imgArr
        })
    next();
})

//get urls with respect to its created date 
//gallery for browser
publicRouter.get("/get-url-by-date/:userId", async (req, res, next) => {
    console.log("Inside /get-url-by-date ", req.params);
    let data = await GalleryModel.getImagesByDate(req.params.userId)
    res.payload= data
})

export default publicRouter;