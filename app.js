if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express=require("express");
const Listing=require("./models/listing");
const ejsMate=require("ejs-mate");
const app=express();
const path=require("path");
const port=8080;
const mongoose=require("mongoose");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");

//routes
const listingsRouter=require("./routes/listing")
const reviewsRouter=require("./routes/review");
const userRouter=require("./routes/userRouter");

const methodOverriding=require("method-override");

//MONGODB URL
let dbUrl=process.env.MONGODB_URL;
async function main(){
    await mongoose.connect(dbUrl);  
}
main().then((res)=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log("Some error occur");
});

app.engine("ejs",ejsMate)
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(methodOverriding("_method"));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("Error in mongo store",err);
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
}

app.use(session(sessionOptions));
app.use(flash());

//user authenticate
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.get("/",(req,res)=>{
    res.render("listings/home.ejs");
});

//user route
app.use("/",userRouter);
//listing routes
app.use("/listings",listingsRouter);
//review route
app.use("/listings/:id/reviews",reviewsRouter);

app.get('/listings', async (req, res) => {
    try {
      const destinations = await Destination.find();  // Fetch data from MongoDB
      res.render('index', { destinations });  // Render the EJS template
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
})
//middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{err});
})

app.listen(port,()=>{
    console.log(`App is listening at ${port}`);
});