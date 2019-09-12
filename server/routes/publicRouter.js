import express from 'express'
import UserModel from "../models/userModel";
import GalleryModel from '../models/galleryModel';

let publicRouter = express.Router({ mergeParams: true })
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

publicRouter.post("/login", async (req, res, next) => {
    console.log("Inside /login", req.body);
    let user = await UserModel.verifyUser(req.body);
    console.log("user", user)
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
publicRouter.get("/get-url/:userId", async(req, res, next)=>{
    // console.log("Inside /images ", req.params);
    let imgArr= await GalleryModel.getImages(req.params.userId);
    res.send({
        success: true,
        payload: imgArr
    })
    next();
})
export default publicRouter;