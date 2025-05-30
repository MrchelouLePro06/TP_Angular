import mongoose, { Schema } from 'mongoose';

const EleveSchema: Schema = new Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  classe: { type: String },
  assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]
});

export const Eleve = mongoose.model('Eleve', EleveSchema);
