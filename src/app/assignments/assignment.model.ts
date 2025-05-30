import mongoose, { Schema } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const AssignmentSchema: Schema = new Schema({
  nom: { type: String, required: true },
  dateDeRendu: { type: Date, required: true },
  matiere: { type: String, required: true },
  eleve : { type: String, required: true },
  rendu: { type: Boolean, default: false },
  note : { type: Number, default: null },
  remarque: { type: String, default: null }
});

AssignmentSchema.plugin(aggregatePaginate);
export const Assignment = mongoose.model('Assignment', AssignmentSchema);
