import mongoose from "mongoose";

const connectetionString = "mongodb://admin_tech:devlOO!!pMental%23%231402!!Tech@91.206.177.124:27017/learn-project?authSource=admin";


const connectionDbApp = async () => {
    try {
        await mongoose.connect(connectetionString);
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
}

export default connectionDbApp