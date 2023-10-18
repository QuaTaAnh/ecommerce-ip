import mongoose from 'mongoose'

const connect = async () =>{
    try {
        const con = await mongoose.connect(process.env.MONGOURL)
        console.log(`Connect success ${con.connection.host}`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
}

export default connect;