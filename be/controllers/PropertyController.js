const jwt = require('jsonwebtoken');
const Properties = require('../models/PropertyModel')

const listProperty = async (req,res) => {
    console.log(req.body,req.cookies)
    const token  = req.cookies.token
    if(!token){
        res.status(401).json({error:"Unauthenticated request"});
        return;
    }
    const {title,location,price,description,imgList, listType} = req.body;
    if(!title || title.length <5 || title.length> 50){
        res.status(400).json({error:"Invalid title"});
        return;
    }
    if(!location || location.length<3 || location.length>100){
        res.status(400).json({error:"Invalid Location"});
        return;
    }
    if(!price || price<0 || price>1000000000){
        res.status(400).json({error:"Give Correct Price"});
        return;
    }

    if(!description || description.length > 1000){
        res.status(400).json({error:"Invalid Description"});
        return;
    }
    if(!imgList || imgList.length==0|| imgList.length > 10){
        res.status(400).json({error:"Invalid imgList"});
        return;
    }
    if(!listType){
        res.status(400).json({error:"Invalid ListType"});
        return;
    }

    try{
        const tokenInfo = jwt.verify(token,process.env.JWT_SECRET);
        const propertyDoc = await Properties.create({
            title,
            location,
            price,
            description,
            imgList,
            listType,
            author: tokenInfo.id
        })
        res.status(201).json({
            message:"Property listed successfully",
        })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }


}
module.exports = {listProperty}