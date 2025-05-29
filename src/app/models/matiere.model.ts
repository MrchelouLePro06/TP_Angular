import mongoose, { Schema } from 'mongoose';

const MatiereSchema: Schema = new Schema({
  nom: { type: String, required: true },
  prof: { type: Schema.Types.ObjectId, ref: 'Prof' }
});

export const Matiere = mongoose.model('Matiere', MatiereSchema);
