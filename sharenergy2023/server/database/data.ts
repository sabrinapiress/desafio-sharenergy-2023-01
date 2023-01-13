const mongoose = require('mongoose')
mongoose.set("strictQuery", true);

const connectDatabase = async (): Promise<any> => {

    await mongoose.connect('mongodb+srv://root:root1234@cluster0.yhzovqe.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('MongoDB Atlas connected')
        })
        .catch((err: any) => {
            console.log(err)
        })
}

module.exports = connectDatabase

export {}