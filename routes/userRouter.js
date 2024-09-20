const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const {saveRedirectUrl}=require("../middleware");
const userControllers=require("../controllers/user");
const passport=require("passport");

router.route("/signup")
//register form
.get(userControllers.register)
//post register
.post(wrapAsync(userControllers.postRegister));

router.route("/login")
//login form
.get(userControllers.loginForm)
//post login form
.post(saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),userControllers.postLogin);

//logout route
router.get("/logout",userControllers.logoutForm)
module.exports=router;