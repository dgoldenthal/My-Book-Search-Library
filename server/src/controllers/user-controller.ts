// user-controller.ts
import { Request, Response } from 'express';
import User, { IUser } from '../models/User.js';
import { signToken } from '../services/auth.js';

export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  const { user, params } = req;
  try {
    const foundUser = await User.findOne({
      $or: [{ _id: user?._id?.toString() || params.id }, { username: params.username }],
    }).select('-__v -password');

    if (!foundUser) {
       res.status(400).json({ message: 'Cannot find a user with this id!' });
       return
    }

     res.json(foundUser);
     return
  } catch (err) {
     res.status(500).json({ error: 'Internal server error' });
     return
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      res.status(400).json({ message: 'Something is wrong!' });
      return;
    }
    const token = signToken({
      username: user.username,
      email: user.email,
      _id: String(user._id),
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ username: email }, { email }] }).exec();
    if (!user || !(await (user as IUser & { _id: string }).isCorrectPassword(password))) {
       res.status(400).json({ message: 'Invalid credentials' });
       return
    }

    const token = signToken({
      username: user.username,
      email: user.email,
      _id: String(user._id), // Ensure _id is treated as a string
    });
     res.json({ token, user });
     return
  } catch (err) {
     res.status(500).json({ error: 'Internal server error' });
     return
  }
};

export const saveBook = async (req: Request, res: Response): Promise<void> => {
  const { user, body } = req;

  try {
    if (!user) {
      res.status(400).json({ message: 'User not authenticated!' });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: String(user._id) },
      { $addToSet: { savedBooks: body } },
      { new: true, runValidators: true }
    ).select('-__v -password');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { user, params } = req;

  try {
    if (!user) {
       res.status(400).json({ message: 'User not authenticated!' });
       return
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: String(user._id) },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    ).select('-__v -password');

    if (!updatedUser) {
       res.status(404).json({ message: "Couldn't find user with this id!" });
       return
    }

     res.json(updatedUser);
     return
  } catch (err) {
     res.status(500).json({ error: 'Internal server error' });
     return
  }
};
