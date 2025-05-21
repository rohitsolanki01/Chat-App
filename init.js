const mongoose = require("mongoose");
const Chat = require("./models/Chat.js")

async function main(){
    await  mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

main().then( () => {
    console.log('Connected to MongoDB');
}).catch( (err) =>{
    console.log('Error connecting to MongoDB: ', err);
})

 const allchats =[
    {
        from : "rohit",
        to : "saurabh",
        msg : "Hello saurabh how are you",
        timestamp : new Date()
    },
    {
        from : "hitanshi",
        to : "rohit",
        msg : "heii , share me you location",
        timestamp : new Date()
    },

 ];

 Chat.insertMany(allchats);