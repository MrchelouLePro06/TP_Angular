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
    const hashedPassword = await bcrypt.hash('admin', 10);
    const admin = new User({ username: 'admin', password: hashedPassword, admin: true });
    await admin.save();
    console.log('Admin créé');
  } else {
    console.log('Admin déjà existant');
  }
}

/*async function importData() {
  const assignments = JSON.parse(fs.readFileSync('./src/data/assignment.json', 'utf-8'));
  await Assignment.insertMany(assignments);
  console.log('assignments importés');

  const user = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf-8'));
  await User.insertMany(user);
  console.log('user importés');
}*/

async function importData() {
  const assignments = JSON.parse(fs.readFileSync('./src/data/assignment.json', 'utf-8'));
  await Assignment.deleteMany({});
  await Assignment.insertMany(assignments);
  console.log('assignments importés');

  let users = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf-8'));
  await User.deleteMany({});
  users = await Promise.all(users.map(async (user: any) => {
    if (!user.password.startsWith('$2b$')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return user;
  }));

  try {
    await User.insertMany(users);
    console.log('user importés');
  } catch (err) {
    console.error('Erreur lors de l\'import des users :', err);
  }
}

mongoose.connect('mongodb://localhost/bdAngular')
  .then(async () => {
    console.log('MongoDB connecté');
    await createAdminIfNotExists();
    await importData();
  })
  .catch((err: any) => console.error(err));
app.use('/api/auth', authRoutes);

app.get("/*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});

app.listen(process.env['PORT'] || 8081, () => {
  console.log("Server started on port " + (process.env['PORT'] || 8081));
});