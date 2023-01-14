import mongoose from 'mongoose';
mongoose.set("strictQuery", true);

const connectDatabase = async (): Promise<any> => {

    await mongoose.connect('mongodb+srv://root:root1234@cluster0.yhzovqe.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('MongoDB Atlas connected')
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const data = module.exports = connectDatabase

export default data