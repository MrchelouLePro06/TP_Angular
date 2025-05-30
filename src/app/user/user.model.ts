import mongoose, {Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

export const User = mongoose.model('User', UserSchema);
