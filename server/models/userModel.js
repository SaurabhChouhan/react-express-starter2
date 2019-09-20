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
    userInput.email = userInput.email.toLowerCase();
    let count = await UserModel.countDocuments({email:userInput.email});
    if(count)
        return "email id is already present";

    userInput.password = await bcrypt.hash(userInput.password, 10);
    let createdUser = await UserModel.create(userInput);
    console.log("Created User ", createdUser);
    return {
        _id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email
    };
}

userSchema.statics.verifyUser = async(email, password)=>{
    email = email.toLowerCase();
    let user = await UserModel.findOne({"email": email})
    if(!user)
        // return "Invalid email id"
        return false;
    let result = await bcrypt.compare(password, user.password)
    if (result)
        return {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        };
    // return "Invalid password"
    return false

}
const UserModel = mongoose.model("User", userSchema)
export default  UserModel;