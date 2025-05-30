const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authRoutes = require('./src/app/user/user.routes');
const { User } = require('./src/app/user/user.model');
import { Prof } from './src/app/models/prof.model';
import { Matiere } from './src/app/models/matiere.model';
import { Eleve } from './src/app/models/eleve.model';
import { Assignment } from './src/app/assignments/assignment.model';
import type { Request, Response } from "express";

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

async function createAdminIfNotExists() {
  const existingAdmin = await User.findOne({ username: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin', 10);
    const admin = new User({ username: 'admin', password: hashedPassword, admin: true });
    await admin.save();
    console.log('Admin créé');
  } else {
    console.log('Admin déjà existant');
  }
}

async function seed() {
  await mongoose.connect('mongodb://localhost/bdAngular');
  console.log('Connecté à MongoDB');

  // Clear existing
  await Prof.deleteMany({});
  await Matiere.deleteMany({});
  await Eleve.deleteMany({});
  await Assignment.deleteMany({});

  // Profs
  const prof1 = await new Prof({ nom: 'Jean Dupont', email: 'jean@school.com' }).save();
  const prof2 = await new Prof({ nom: 'Marie Curie', email: 'marie@school.com' }).save();

  // Matières
  const bd = await new Matiere({ nom: 'base de données', prof: prof1._id }).save();
  const os = await new Matiere({ nom: 'OS', prof: prof2._id }).save();

  // Éléves
  const eleve1 = await new Eleve({ nom: 'Alice', email: 'alice@eleve.com', classe: 'M1 Informatique' }).save();
  const eleve2 = await new Eleve({ nom: 'Bob', email: 'bob@eleve.com', classe: 'M1 Informatique' }).save();

  // Assignements
  await new Assignment({
    nom: 'TP base de données',
    dateDeRendu: new Date('2025-06-01'),
    matiere: bd._id,
    notes : [
      {eleve: eleve1._id,note: 12,rendu: true},
      {eleve: eleve2._id, note: 19,rendu: true}
    ]
  }).save();

  await new Assignment({
    nom: 'TP OS',
    dateDeRendu: new Date('2025-06-03'),
    matiere: os._id,
    notes : [
      {eleve: eleve1._id,note: 15,rendu: true},
      {eleve: eleve2._id, note: null,rendu: false}
    ]
  }).save();

  console.log('Données insérées !');
}

mongoose.connect('mongodb://localhost/bdAngular')
  .then(async () => {
    console.log('MongoDB connecté');
    await createAdminIfNotExists();
    //await seed();
  })
  .catch((err: any) => console.error(err));
app.use('/api/auth', authRoutes);

app.get("/*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});

app.listen(process.env['PORT'] || 8081, () => {
  console.log("Server started on port " + (process.env['PORT'] || 8081));
});