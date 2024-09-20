const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },    
    image:{
        url:String,
        filename:String
    },    
    price:{
        type:Number,
        required:true,
    },    
    location:{
        type:String,
        required:true,
    },    
    country:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        enum:["Trendings","New","others","Rooms","Popular","Farms","Awesome","BeachFront","Pools","TreeHouse","Castle","HistoricPlace","Island","Lake","container","Wilds"],
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    // geometry:{
    //     type:{
    //         type:String,
    //         enum:['Point'],
    //         required:true
    //     },
    //     coordinates:{
    //         type:[Number],
    //         required:true
    //     }
    // }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;