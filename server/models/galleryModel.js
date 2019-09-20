import mongoose, { Schema } from 'mongoose';

var gallerySchema = new Schema({
    user: {
        _id: mongoose.Schema.ObjectId
    },
    gallery: [{
        url: String,
        description: String,
        location: { latitude: Number, longitude: Number },
        created: Date
    }]
})

gallerySchema.statics.addImages = async (images) => {
    console.log("Inside addImages", images);
   
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
gallerySchema.statics.getImages = async (userId, size) => {
    console.log("Inside getImages  ", size);

    let criteria = { "user._id": mongoose.Types.ObjectId(userId) }
    let data;
    if (size === 'all')
        data = await GalleryModel.aggregate([
            { $match: criteria },
            { $unwind: "$gallery" },
            { $sort: { "gallery.created": -1 } },
            {
                $group: { _id: '$_id', 'images': { $push: '$gallery.url' } }
            },
            { $project: { 'gallery': '$images' } }])
    else
        data = await GalleryModel.aggregate([
            { $match: criteria },
            { $unwind: "$gallery" },
            { $sort: { "gallery.created": -1 } }, { $limit: size },
            {
                $group: {
                    _id: '$_id', 'images': {
                        $push: {
                            "url": '$gallery.url',
                            "description": "$gallery.description",
                            "date": "$gallery.created",
                            "location": "$gallery.location"
                        }
                    }
                }
            },
            { $project: { 'gallery': '$images' } }])
    if(!data)
        return "No Images are available"
    console.log("Inside getImages ", data)
    return data[0].gallery
}
gallerySchema.statics.getImagesByDate = async(userId)=>{
    console.log("Inside getImagesByDate ",userId);
    let criteria = { "user._id": mongoose.Types.ObjectId(userId) }
    let data;
    data = await GalleryModel.aggregate([
        {$match: criteria},
        { $unwind: "$gallery" },
        { $sort: { "gallery.created": -1 } },
        
        {
            $group: {
                _id: {
                    $add: [
                     { $dayOfYear: "$gallery.created"}, 
                     { $multiply: 
                       [400, {$year: "$gallery.created"}]
                     }
                  ]},
                images: {
                    $push: {
                        url: "$gallery.url",
                        description: "$gallery.description",
                        location: "$gallery.location",
                        date: "$gallery.created",
                        name: {$arrayElemAt:[{arr: {$split:["$gallery.url", "/"]}}.arr, -1]}
                    }
                },
                first: {$min: "$gallery.created"}
            }
        },
        { $project: { date: "$first", gallery: "$images", _id: 0} } ,
        { $sort: { "date": -1 } }
    ])
    console.log("Data ", data)
    if(!data)
        return "No Images are available"
    
    return data
}

const GalleryModel = mongoose.model("gallery", gallerySchema);
export default GalleryModel;