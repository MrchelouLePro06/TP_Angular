export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  rendu?: boolean;
  note?: number;
  eleve?: any;
  matiere?: any;
}