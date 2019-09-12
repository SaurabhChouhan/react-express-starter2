import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'

var userSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isDeleted: {type: Boolean, default: false}
});

userSchema.statics.getAllUsers= async ()=>{
    return await UserModel.find({"isDeleted": false});
}

userSchema.statics.createUser = async(userInput)=>{
    let count = await UserModel.countDocuments({email:userInput.email});
    if(count)
        return "email id is already present";

    userInput.password = await bcrypt.hash(userInput.password, 10);
    let createdUser = await UserModel.create(userInput);
    console.log(createdUser)
    return {
        _id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email
    };
}

userSchema.statics.verifyUser = async(userInput)=>{
    let user = await UserModel.findOne({"email": userInput.email})
    if(!user)
        return "Invalid email id"
    let result = await bcrypt.compare(userInput.password, user.password)
    if (result)
        return {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        };
    return "Invalid password"

}
const UserModel = mongoose.model("User", userSchema)
export default  UserModel;