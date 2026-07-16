const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const pdfSchema = new Schema({
    pdf:{
        type:String,
        required:true,//validate
    },
    title:{
        type:String,
        required:true,//validate
    },
});
mongoose.model("pdfDetails", pdfSchema);