import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './user.model';

export class SetUser{

    constructor(
        public username: string,
        public password: string,
        public admin: boolean
    ) {}

async insertUser() {
  try {
    await mongoose.connect('mongodb://localhost/bdAngular');
    const { username, password,admin } = this;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`L'utilisateur ${username} existe déjà.`);
      return;
    }

    //const hashedPassword = await bcrypt.hash(password, 10);
    //const newUser = new User({ username, password: hashedPassword,admin });
    const newUser = new User({ username, password,admin });
    await newUser.save();

    console.log(`Utilisateur ${username} inséré.`);
    console.log('Insertion terminée.');
  } catch (err) {
    console.error('Erreur:', err);
  }
  mongoose.connection.close();
}
}

