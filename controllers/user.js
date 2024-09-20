const passport=require("passport");
const User = require("../models/user");

module.exports.register=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.postRegister=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({
            email,username
        });
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to wanderlust!");
            res.redirect("/listings");
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.postLogin=async(req,res)=>{
    req.flash("success","Welcome to wanderlust!You are logged in..");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logoutForm=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
}