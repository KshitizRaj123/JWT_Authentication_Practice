const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) =>
{
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1]
    if (!token)
    {
        res.status(401).json(
            {
                status : "failure",
                message : "Sorry, do do not carry the correct token!!!"
            }
        )
    }

    //decode the token
    try{
        const decodedTokenInfo = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decodedTokenInfo);
        req.userInfo = decodedTokenInfo;
        next();
    }
    catch(e)
    {
        res.status(500).json(
            {
                status : "failure",
                message : "Something went wrong with the middleware!!!"
            }
        )
        console.log(`the following error: ${e} happened in the middleware!!!`);
    }
}
module.exports = authMiddleware