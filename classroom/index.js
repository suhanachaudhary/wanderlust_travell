const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const users=require("./routes/user");
let  session = require('express-session')
const flash=require("connect-flash");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

const sessionOptions={
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash())

app.get("/",(req,res)=>{
    res.send("home page");
});
app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user registered successfully:")
    res.redirect("/hello")

});
app.get("/hello",(req,res)=>{
    res.locals.messages=req.flash("success")
    res.render("page.ejs",{name:req.session.name});
})

app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
});