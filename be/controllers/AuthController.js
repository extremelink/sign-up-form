const bcrypt = require('bcryptjs');
const Users = require('../models/UserModel');
const { log } = require('../utility/AppUtils');
const salt = bcrypt.genSaltSync(10)
const emailFormat=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const usernameFormat=/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/
const passwordFormat=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
const phoneFormat=/^\+?(\d{1,4})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/
const jwt = require('jsonwebtoken')

const regexMap ={
"phoneFormat":/^\+?(\d{1,4})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})$/,
"emailFormat":/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
"usernameFormat":/^[a-zA-Z0-9]+$/,
"passwordFormat":/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
}

const signupUser = async (req,res)=>{
    const {name,phone, email,username,password} = req.body;
    log(req.body)
    if(name.length <2 || name.length > 50){
        res.status(400).json({error:"Name should be >1 and less than 50 characters"})
        return;
    }
    if (phone<1000000000 || phone[0]<6 || phone>10000000000){
        res.status(400).json({error:'invalid phone'});
        return;
    }
    if(!phoneFormat.test(phone)){
        res.status(400).json({error:'invalid phone'});
        return;
    }
    if(!emailFormat.test(email)){
        res.status(400).json({error:'invalid email'});
        return;
    }
    if(!usernameFormat.test(username)){
        res.status(400).json({error:'invalid username'});
        return;
    }
    if(!passwordFormat.test(password)){
        res.status(400).json({error:'invalid password'});
        return;
    }
    // Object.entries(regexMap).forEach(([key,value])=>{
    //     const attr=key.replace("Format","");
    //     if(!value.test(attr)){
    //         res.status(400).json({error:`invalid ${attr}`})
    //         return;
    //     }
    // })

    try{
        // fix password encryption
        //  duplicacy handling
        const userByUserName = await Users.findOne({username:username})
        if(userByUserName){
            res.status(400).json({error:"Username already exists"})
            return;
        }
        const userByEmail = await Users.findOne({email:email})
        if(userByEmail){
            res.status(400).json({error:"Email already exists"})
            return;
        }
        const userByPhone = await Users.findOne({phone:phone})
        if(userByPhone){
            res.status(400).json({error:"Phone already exists"})
            return;
        }
        const user=await Users.create({name,phone,email,username,password: bcrypt.hashSync(password,salt)})
        return res.status(201).json(user)
        // res.end('signup done by adyaksh')
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'Internal Server Error'})
    }
}

const loginUser = async(req,res)=>{
    const {username,password} = req.body
    
    try{
       const userDoc= await Users.findOne({username:username})
       if(!userDoc){
        res.status(400).json({error:"Invalid Username"});
        return;
       }
       const isValidPassword = bcrypt.compareSync(password,userDoc.password)
       if(!isValidPassword){
        res.status(400).json({error:"Invalid username or password"});
        return;
       }
       const expiresIn='5h'
       const token = jwt.sign({id:userDoc.id},process.env.JWT_SECRET,{expiresIn});
       res.cookie('token',token,{httpOnly:true,sameSite:'none',secure:true})
       .status(200)
       .json({
        message:'login successful', 
        userInfo:{
            id:userDoc._id,
            name:userDoc.name,
            email:userDoc.phone,
            username:userDoc.username
        } 
       })
    }catch(e){

    }
    res.end();

}

const getProfileInfoByCookie = async (req,res) =>{
    const {token} = req.cookies;
    if(!token){
        res.status(401).end();
        return;
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userDoc = await Users.findOne({_id:decoded.id})
        res.status(200).json({
            userInfo:{
                id:userDoc._id,
                name:userDoc.name,
                email:userDoc.email,
                phone:userDoc.phone,
                username:userDoc.username
            }
        })
    }catch(err){
        res.status(401).end();
    }
}


const logout= (req,res)=>{
    res.clearCookie('token').status(200).json({message:"Logged out successfully"})
}

module.exports = {signupUser,loginUser,getProfileInfoByCookie,logout}
