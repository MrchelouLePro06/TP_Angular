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
import * as fs from 'fs';

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

async function createAdminIfNotExists() {
  const existingAdmin = await User.findOne({ username: 'admin' });
  if (!existingAdmin) {
    //const hashedPassword = await bcrypt.hash('admin', 10);
    //const admin = new User({ username: 'admin', password: hashedPassword, admin: true });
    const admin = new User({ username: 'admin', password: 'admin', admin: true });
    await admin.save();
    console.log('Admin créé');
  } else {
    console.log('Admin déjà existant');
  }
}

async function importData() {
  await Assignment.deleteMany({});
  await User.deleteMany({});
  const assignments = JSON.parse(fs.readFileSync('./src/data/assignment.json', 'utf-8'));
  await Assignment.insertMany(assignments);
  console.log('assignments importés');

  const user = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf-8'));
  await User.insertMany(user);
  console.log('user importés');
}

mongoose.connect('mongodb://localhost/bdAngular')
  .then(async () => {
    console.log('MongoDB connecté');
    await importData();
    await createAdminIfNotExists();
  })
  .catch((err: any) => console.error(err));
app.use('/api/auth', authRoutes);

app.get("/*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});

app.listen(process.env['PORT'] || 8081, () => {
  console.log("Server started on port " + (process.env['PORT'] || 8081));
});