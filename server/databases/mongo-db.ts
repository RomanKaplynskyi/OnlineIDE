import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://dbUser:Z4127052z@cluster0.tykc7.mongodb.net/dbtest?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
});

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function() {
    console.log('we are connected!');
});

export default mongoDB;
