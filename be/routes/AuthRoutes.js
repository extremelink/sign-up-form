const express = require('express');
const { signupUser, loginUser } = require('../controllers/AuthController');
const router = express.Router();

// router.post('/signup',(req,res)=>{
//     res.end('signup done')
// })

router.post('/signup',signupUser)
router.post('/login',loginUser)
module.exports = router