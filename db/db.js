const mongoose = require('mongoose')

async function connectDB()
{
    try
    {
        await mongoose.connect(process.env.MONGO__URL)
        console.log("DB Connected Sucessfully",mongoose.connection.name)
    }
    catch(e)
    {
        console.log(`Due to the following ${e}, DB didnt connect`);
        process.exit(1);
    }
}
module.exports=connectDB;