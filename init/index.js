const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');  
}
main().then((res)=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log("Some error occur");
});

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"66bd616ff7d4ce419033d01c"}));
    initData.data=initData.data.map((obj)=>({...obj,category:"Trendings"}));
    await Listing.insertMany(initData.data);
    console.log("data saved")
};
initDB();

