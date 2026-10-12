const User = require('../Models/schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//register controller
const registerUser=async(req,res)=>{

    try{
        const {username,email,password,role} = req.body;

        const user = await User.findOne({$or :[
            {username},{email}
        ]})
        if (user)
        {
            return res.status(400).json(
                {
                    status : "failure",
                    message : "User with that username or email already exists!!!"
                }
            )
        }
         const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;
         if (!passwordRegex.test(password))
         {
            return res.status(400).json(
                {
                    status: "failure",
                    message : "password must contain at least 1 uppercase 1 lower case and a special character"
                }
            )
         }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        //create a new user and save in database
        const newUser = new User(
            {
                username,
                email,
                password : hashedPassword,
                role: role || 'user'
            }
        )
        await newUser.save()
        if (newUser)
        {
            res.status(201).json(
                {
                    status : "sucessful",
                    message : "User registered sucessfully"
                }
            )
        }
        
    }
    catch(e)
    {
        console.log(`The task failed due to the error ${e}`)
        res.status(500).json(
            {
                status:"failure",
                message :"Something went wrong!!!"
            }
        )
    }
}

//login controller
const loginUser = async(req,res)=>
{
    try{
        //extract user information from our request body
        const {username,password} = req.body;

        //check if the user already exists
        const user = await User.findOne({username}).select('+password');
        if (!user)
        {
            return  res.status(400).json(
                {
                    status : "failure",
                    message : "Invalid Credentials!!!"
                }
            )
        }

        
        //check if the password is correct or not
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if (!isPasswordCorrect)
        {
            return  res.status(400).json(
                {
                    status : "failure",
                    message : "Invalid Credentials!!!"
                }
            )  
        }

        // console.log("User object:", user);
        // console.log("Email:", user.email);
        // console.log("Username:", user.username);
        //create token
        const accessToken = jwt.sign({
            userId: user.__id,
            username: user.username,
            role: user.role,
            //password : user.password
            //email : user.email
        },process.env.JWT_SECRET_KEY,
        {
            expiresIn : "15m"
        })
        res.status(200).json(
                {
                    status : "sucess",
                    message : "You have logged in sucessfully!!!!",
                    accessToken
                }
            )
     }
    catch(e)
    {
        console.log(`The task failed due to the error ${e}`)
        res.status(500).json(
            {
                status:"false",
                message : "Something went wrong, login tira hai!!!"
            }
        )
    }
}

module.exports = {registerUser,loginUser}