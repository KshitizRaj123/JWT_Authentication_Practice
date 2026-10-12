const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')


router.get('/welcome',authMiddleware,(req,res)=>
{
    const {username,userId} = req.userInfo;

    res.json(
        {
            message : "Welcome to the home page man!!!" ,
            user:
            {
                _id : userId,
                name: username
            }
        }
    )
    
})

module.exports = router