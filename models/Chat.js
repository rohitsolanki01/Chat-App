const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    msg : {
        type : String,
        maxLength : 100,
    },
    timestamp : {
        type : Date,
    }

});


const Chat = mongoose.model("Chat" , chatSchema);

module.exports  = Chat;