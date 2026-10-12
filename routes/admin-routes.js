const express = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const adminCheck = require('../middleware/amin-middleware')
const router = express.Router()

//

router.get('/welcome',authMiddleware,adminCheck,(req,res)=>
{
    res.json({
        message : "Hello dear admin!!!"
    })
})

module.exports = router