const Listing=require("../models/listing");
const {listingSchema}=require("../schema");

module.exports.index=async(req,res)=>{
    let allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showRoute=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{
        path:"author",
    },
})
.populate("owner");
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

module.exports.postListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    console.log(req.body.listing);

    newListing.owner=req.user._id;
    newListing.image={url,filename};

    await newListing.save();
    req.flash("success","Listing created successfully");
    res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for doesn't exist!");
        return res.redirect("/listings");
    }
    let originalUrl=listing.image.url;
    originalUrl.replace("/uploads", "/upload/c_fill,w_350/e_blur:300");
    res.render("listings/edit.ejs",{listing,originalUrl});
}

module.exports.postEdit=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing updated successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted successfully");
    res.redirect("/listings");
}