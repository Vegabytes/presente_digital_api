//Configuration properties
import { config } from 'dotenv'
config();


export default {
    PORT: process.env.PORT || 4000,
    // MONGO_ATLAS: process.env.MONGO_ATLAS || 'mongodb+srv://admin:<password>@cluster0.slsok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    MONGO_ATLAS: process.env.MONGO_ATLAS || 'mongodb://127.0.0.1:27017',
    SECRET: process.env.SECRET

}