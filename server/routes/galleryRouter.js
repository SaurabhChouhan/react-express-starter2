import express from 'express'
import GalleryModel from '../models/galleryModel';

let galleryRouter = express.Router({mergeParams: true})

galleryRouter.post('/add-url', async (req, res, next) => {
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
galleryRouter.get("/get-url/:userId/:limit", async (req, res, next) => {
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
galleryRouter.get("/get-url-by-date/:userId", async (req, res, next) => {
    console.log("Inside /get-url-by-date ", req.params);
    let data = await GalleryModel.getImagesByDate(req.params.userId)
    res.payload= data

})
export default galleryRouter;