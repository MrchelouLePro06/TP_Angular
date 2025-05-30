export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: Date;
  matiere?: string;
  eleve?: string;
  note?: number;
  rendu!: boolean;
  remarque?: string;
}