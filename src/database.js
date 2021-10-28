import mongoose from 'mongoose'
import config from './config'



(async() => {
    try {
        const db = await mongoose.connect(config.MONGO_ATLAS);
        console.log(`App connected to database ${db.connection.name}`);
    } catch (err) {
        console.log(err);
    }

})()