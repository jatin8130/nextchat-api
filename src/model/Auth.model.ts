import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { nextTick } from "node:process";

const AuthSchema = new Schema({
    image: {
        type: String,
        default: null
    },
    name: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    refreshtoken: {
        type: String,
        default: null
    },
    expiry: {
        type: Date,
        default: null
    }
}, {timestamps: true})

AuthSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  
  this.password = await bcrypt.hash(this.password, 12);
});

const AuthModel = model('Auth', AuthSchema);

export default AuthModel; 