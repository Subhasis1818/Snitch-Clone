import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:2,
        maxLength:200
    },
    description:{
        type:String,
        required:true,
        minLength:20,
        maxLength:500
    },
    images: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length <= 5;
            },
            message: "You can upload a maximum of 5 images."
        }
    },
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum:["INR","USD"],
            default:["INR"]
        }

    }
})