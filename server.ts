const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authRoutes = require('./src/app/user/user.routes');
const { User } = require('./src/app/user/user.model');
import { Assignment } from './src/app/assignments/assignment.model';
import type { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const SECRET = 'votre_secret'
import * as fs from 'fs';

declare module "express" {
  export interface Request {
    user?: any;
  }
}
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

function isAdmin(req: Request, res: Response, next: Function) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.admin) {
      req.user = decoded;
      return next();
    }
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
}

app.get('/api/assignments', async (req: Request, res: Response) => {
  const page = parseInt(req.query['page'] as string) || 1;
  const limit = parseInt(req.query['limit'] as string) || 10;

  const aggregate = Assignment.aggregate([]);
  Assignment.aggregatePaginate(aggregate, { page, limit })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.post('/api/assignments', isAdmin, async (req: Request, res: Response) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ message: "Assignment ajouté", assignment });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout" });
  }
});

app.put('/api/assignments/:id', isAdmin, async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params['id'], req.body, { new: true });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment non trouvé" });
    }
    return res.json({ message: "Assignment modifié", assignment });
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la modification" });
  }
});

app.delete('/api/assignments/:id', isAdmin, async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params['id']);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment non trouvé" });
    }
    return res.json({ message: "Assignment supprimé" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

app.get('/api/assignments/:id', async (req: Request, res: Response) => {
  try {
    const assignment = await Assignment.findById(req.params['id']);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    return res.json(assignment);
  } catch (err) {
    return res.status(500).json({ message: "erreur" });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { username, password, admin } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username et password requis" });
    }
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Utilisateur déjà existant" });
    }
    const user = new User({ username, password,admin:false});
    await user.save();
    return res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

app.get('/api/auth/me', async (req:Request, res:Response) => {
  res.json({ admin: true });
});

app.get("/*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});

app.listen(process.env['PORT'] || 8081, () => {
  console.log("Server started on port " + (process.env['PORT'] || 8081));
});