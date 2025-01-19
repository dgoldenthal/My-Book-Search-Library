import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string; // Explicitly define _id as a string
  username: string;
  email: string;
  password: string;
  savedBooks: Array<{
    bookId: string;
    authors?: string[];
    description?: string;
    title: string;
    image?: string;
    link?: string;
  }>;
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedBooks: [
    {
      bookId: {
        type: String,
        required: true,
      },
      authors: [String],
      description: String,
      title: {
        type: String,
        required: true,
      },
      image: String,
      link: String,
    },
  ],
});

// Export the model
export default model<IUser>('User', userSchema);
