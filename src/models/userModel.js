const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/[a-zA-z0-9.-]+(.[a-zA-z]{2,})+/, "Please Enter Valid Email ID"],
    
    },
    password: {
        type: String,
        required: true,
        minlength: 8, //minimum length of pwd 8
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
}   
}, { timestamps: true });

UserSchema.pre("save", async function(next)
{
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);

};  
module.exports = mongoose.model("User",UserSchema);