const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const authRoutes = require('./src/app/user/user.routes');
const { User } = require('./src/app/user/user.model');
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
mongoose.connect('mongodb://localhost/bdAngular')//mongodb://127.0.0.1:27017/bdAngular mongodb://localhost/bdAngular
  .then(async () => {
    console.log('MongoDB connecté');
    await createAdminIfNotExists();
  })
  .catch((err: any) => console.error(err));
app.use('/api/auth', authRoutes);

app.get("/*", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname + "/dist/assignment-app/browser/index.html"));
});

app.listen(process.env['PORT'] || 8081);