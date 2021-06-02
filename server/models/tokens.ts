import mongoose from 'mongoose'

const tokensSchema = new mongoose.Schema({
    rtoken:{
        type: String,
        required: true
    }
});

export default mongoose.model('tokens', tokensSchema);
