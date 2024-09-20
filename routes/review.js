const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync")
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware");
const reviewControllers=require("../controllers/reviews");

//create review
router.post("/",isLoggedIn,wrapAsync(reviewControllers.createReview));

//delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

module.exports=router;
