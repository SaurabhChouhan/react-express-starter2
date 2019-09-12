import mongoose, { Schema } from 'mongoose';

var gallerySchema = new Schema({
    user: {
        _id: mongoose.Schema.ObjectId
    },
    // url: [String],
    // description: String,
    // location: { longitude: Number, latitude: Number },
    // created: Date,
    gallery: [{
        url: String,
        description: String,
        location: { latitude: Number, longitude: Number },
        created: Date
    }]
})

gallerySchema.statics.addImages = async (images) => {
    console.log("Inside addImages", images);
    // let imageArr =img.url.split(",");
    // imageArr[0] = imageArr[0].replace("[","");
    // imageArr[imageArr.length-1] = imageArr[imageArr.length-1].replace("]","");
    // let data = await GalleryModel.create({
    //     user: { _id: mongoose.Types.ObjectId(img._id) },
    //     url: img.url,
    //     description: img.description,
    //     location: img.location,
    //     created: img.date
    // })
    let data = await GalleryModel.findOne({ "user._id": images._id });
    console.log(data)

    if (!data)
        data = await GalleryModel.create({
            user: { _id: mongoose.Types.ObjectId(images._id) },
            gallery: []
        });
    for (let img in images.url) {
        data.gallery.push({
            url: images.url[img],
            description: images.description,
            created: images.date,
            location: images.location
        })
    }
    await data.save();
    console.log("After save data ", data)
    if (data)
        return data
    return false
}
gallerySchema.statics.getImages = async (userId) => {
    // console.log("Inside getImages  ", userId);
    let criteria = { "user._id": mongoose.Types.ObjectId(userId) }
    let data = await GalleryModel.aggregate([
        { $match: criteria },
        { $unwind: "$gallery" },
        { $sort: { "gallery.created": -1 } }, { $limit: 3 },
        {
            $group: { _id: '$_id', 'images': { $push: '$gallery' } }
        },
        { $project: { 'gallery': '$images' } }])
    console.log("Inside getImages ", data)
    return data
}

const GalleryModel = mongoose.model("gallery", gallerySchema);
export default GalleryModel;