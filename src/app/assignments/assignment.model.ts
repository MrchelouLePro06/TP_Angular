import mongoose, { Schema } from 'mongoose';

const AssignmentSchema: Schema = new Schema({
  nom: { type: String, required: true },
  dateDeRendu: { type: Date, required: true },
  matiere: { type: String, required: true },
  eleve : { type: String, required: true },
  rendu: { type: Boolean, default: false },
  note : { type: Number, default: null },
  remarque: { type: String, default: null }
});

export const Assignment = mongoose.model('Assignment', AssignmentSchema);
