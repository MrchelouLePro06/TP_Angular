/*export class Assignment {
    _id!:string;
    nom!:string;
    dateDeRendu!:Date;
    rendu!:boolean;
}*/
import mongoose, { Schema } from 'mongoose';

const AssignementSchema: Schema = new Schema({
  titre: { type: String, required: true },
  dateRendu: { type: Date, required: true },
  note: { type: Number, default: null },
  rendu: { type: Boolean, default: false },
  eleve: { type: Schema.Types.ObjectId, ref: 'Eleve' },
  matiere: { type: Schema.Types.ObjectId, ref: 'Matiere' }
});

export const Assignement = mongoose.model('Assignement', AssignementSchema);
