import User from '../models/User.js';
import { signToken } from '../services/auth.js';
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (!user || !(await user.isCorrectPassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = signToken(user.username, user.email, user._id);
        return res.json({ token, user });
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
