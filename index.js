const express = require("express");
const app = express();
const path = require("path")
const mongoose = require("mongoose");
const Chat = require("./models/Chat.js")
const methodOverRide = require("method-override");

app.use(express.urlencoded({extended :true}));
app.use(express.json());
app.use(methodOverRide("_method"));


app.use(express.static(path.join(__dirname , "public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

async function main(){
    await  mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
}

main().then( () => {
    console.log('Connected to MongoDB');
}).catch( (err) =>{
    console.log('Error connecting to MongoDB: ', err);
})


//show users 
app.get("/chats" ,async (req , res) => {
    let chats = await Chat.find();
    res.render("index.ejs" , {chats});
});

//new chat form 

app.get("/chats/new" , (req,res) => {
    res.render("new.ejs");
})
 
// add new message 
app.post("/chats" , (req,res) => {
    let {from , to , msg , timestamp} = req.body;
    let newChat = new Chat({
        from : from,
        to : to ,
        msg : msg,
        timestamp : timestamp
    });
    newChat.save().then((res) => {
        console.log(res);
        
    }).catch((err) => {
        console.log(err);
    })
    res.redirect("/chats");
})

//firt find the id then given edit form 

app.get("/chats/:id/edit" , async(req,res) => {
    let { id } =req.params;
    let chat =  await Chat.findById(id);
    res.render("edit.ejs" , {chat});
})

//update chats

app.put("/chats/:id" , (req,res) => {
    let { id } = req.params;
    let  { from : newForm , to : newTo , msg :newMsg , timestamp : newTimeStap} = req.body;
    let update = Chat.findByIdAndUpdate(id , {
        from : newForm,
        to : newTo ,
        msg : newMsg,
        timestamp : newTimeStap
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
    console.log(update);
    
    res.redirect("/chats");
    
})

// delete chat
app.delete("/chats/:id" , async(req,res) => {
    let { id } = req.params;
    let chatDelete = await Chat.findByIdAndDelete(id)
    console.log(chatDelete);
    
    res.redirect("/chats");
})

//reply to the user

app.get("/chats/:id/reply" , async (req,res) => {
    let { id } = req.params;
    let chats = await Chat.findById(id);
    res.render("reply.ejs" , {chats});       
})

//
app.listen(8080 , () => {
    console.log('Server is running on port 8080');
})