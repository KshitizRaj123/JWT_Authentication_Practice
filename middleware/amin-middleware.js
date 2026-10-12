const isAdminUser = (req,res,next)=>
{
    if(req.userInfo.role!=='admin')
    {
      return res.status(403).json(
        {
            status : "Failure",
            message : "You do not have enough credentials to be an admin"
        }
      )
    }
    next()
}

module.exports = isAdminUser;