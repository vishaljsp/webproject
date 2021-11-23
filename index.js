var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const port=process.env.PORT || 3000;

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/hacker',{
    // mongoose.connect("mongodb+srv://mahakal:dcGRfUjkZZLNWpdg@cluster0.pfjff.mongodb.net/hacker?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify:false
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "password" : password
    }

    db.collection('blackhet').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(port, () => {
    console.log(`sarver is runing on port number ${port}`);

});

