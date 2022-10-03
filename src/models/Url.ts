import mongoose from 'mongoose'
const schema = new mongoose.Schema(
    {
        urlId: {
            type: String,
            required: true,
        },
        origUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            default: Date.now,
        },
    }
)

export const UrlModel = mongoose.model('URL', schema)