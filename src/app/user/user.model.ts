import mongoose, {Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  prof: { type: Schema.Types.ObjectId, ref: 'Prof', default: null },
  eleve: { type: Schema.Types.ObjectId, ref: 'Eleve', default: null }
});

export const User = mongoose.model('User', UserSchema);
