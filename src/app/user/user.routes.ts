import express, { Request, Response } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./user.model');

const router = express.Router();
const jwtSecret = 'secret'; // à mettre dans .env dans un vrai projet

// Inscription
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("Utilisateur créé et réponse envoyée");
    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    return 0;
  }
});

// Connexion
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }) as { [key: string]: any } | null;
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    //const isMatch = await bcrypt.compare(password, user['password'] as string);
    const isMatch = password === user['password'];
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user['_id'] }, jwtSecret, { expiresIn: '1h' });
    console.log("Utilisateur connecté et token généré");
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
