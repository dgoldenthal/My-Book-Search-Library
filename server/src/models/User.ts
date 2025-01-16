import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Book schema
const bookSchema = new Schema({
  bookId: { type: String, required: true },
  authors: [String],
  description: String,
  title: String,
  image: String,
  link: String,
});

// User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedBooks: [bookSchema],
});

// Pre-save middleware to hash passwords
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance method to validate password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
export default User;
