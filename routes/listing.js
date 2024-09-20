const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync")
const {isLoggedIn,isOwner,validateListing,saveRedirectUrl}=require("../middleware");
const listingControllers=require("../controllers/listing");
const multer  = require('multer')
const {storage}=require("../cloudConfig");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,listingControllers.postListing);


//create new route
router.get("/new",isLoggedIn,listingControllers.renderNewForm);

router.route("/:id")
    //show route
    .get(saveRedirectUrl,wrapAsync(listingControllers.showRoute))
    .put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing,wrapAsync(listingControllers.postEdit))
    .delete(isLoggedIn,wrapAsync(listingControllers.deleteListing))

//update route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.renderEditForm));

module.exports=router;

