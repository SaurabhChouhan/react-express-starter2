import express from 'express'
import galleryRouter from './galleryRouter'
import AppError from '../AppError'
import publicRouter from './publicRouter'
import passport from 'passport'

let apiRouter = express.Router({ mergeParams: true })

apiRouter.use('/public', publicRouter);
console.log("hello")
apiRouter.use('/', passport.authenticate('local', { session: false }))
console.log("Hii")

apiRouter.use( async(req, res, next) => {
    console.log("Inside apiRouter");
    console.log("isAuthenticated ", req.isAuthenticated())
    if (req.isAuthenticated()) {
        console.log(req.user)
        return await next();
    } else {
        throw new AppError('Access Denied', "ACCESS_DENIED", 403)
    }
})
apiRouter.use('/home', galleryRouter);
apiRouter.use('/', (req, res) => {
    res.json({
        success: true,
        payload: res.payload
    })
})

export default apiRouter;