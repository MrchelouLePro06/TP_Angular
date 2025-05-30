import mongoose, { Schema } from 'mongoose';

const ProfSchema: Schema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  matiere: [{ type: Schema.Types.ObjectId, ref: 'Matiere' }]
});

export const Prof = mongoose.model('Prof', ProfSchema);
