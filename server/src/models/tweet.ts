import { Schema, model, Document, Mongoose } from 'mongoose';
import ITweet from '../types/types'

const tweetSchema = new Schema<ITweet>({
    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true,
        maxlength: [240, 'The text must be no longer then 240 characters']
    },
    stars: [{
        type: String
    }]

})

export default model<ITweet>('Tweet', tweetSchema);