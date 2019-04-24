import * as mongoose from 'mongoose';

export const subscribedSchema = new mongoose.Schema({
    chatId: {type: String, unique: true},
});

export const Subscribed = mongoose.model('Subscribed', subscribedSchema);