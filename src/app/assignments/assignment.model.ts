import mongoose, { Schema } from 'mongoose';

const AssignmentSchema: Schema = new Schema({
  nom: { type: String, required: true },
  dateDeRendu: { type: Date, required: true },
  matiere: { type: Schema.Types.ObjectId, ref: 'Matiere' },
  notes: [{ 
    eleve: { type: Schema.Types.ObjectId, ref: 'Eleve' },
    rendu: { type: Boolean, default: false },
    note : {type: Number, default: null }
}]
});

export const Assignment = mongoose.model('Assignment', AssignmentSchema);
