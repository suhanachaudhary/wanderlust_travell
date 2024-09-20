const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("get router");
});
router.post("/",(req,res)=>{
    res.send("post router");
});
router.get("/:id",(req,res)=>{
    res.send("get id router");
});
module.exports=router;