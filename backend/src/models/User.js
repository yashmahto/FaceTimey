import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname  : {
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique : true, 
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
    },
    bio : {
        type : String,
        default : "",
    },
    profilePics : {
        type : String,
        default : "",
    },
    nativeLanguage : {
        type : String,
        default : "",
    },
    learningLanguage : {
        type : String,
        default : "",
    },
    location : {
        type : String,
        default : "",
    },
    isOnboarded : {
        type : String,
        default : "",
    },
  friends : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
  ]
},{timestamps:true}
);


const User = mongoose.model("User",userSchema);

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
    }
}) 

export default User;
