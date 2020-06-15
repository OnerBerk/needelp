const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const connectToDatabase = async() =>
{
    try
    {
       await mongoose.connect
        (
            process.env.MONGO_URI,
            {
                useCreateIndex:true,
                useFindAndModify:true,
                useUnifiedTopology:true,
                useNewUrlParser:true
            }
        )

        console.log('Mongodb est connecté baby ! 💪');
    } 
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectToDatabase;