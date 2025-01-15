import { Router } from 'express';
import { loginUser } from '../../controllers/user-controller.js';

const router = Router();

// Define user-related routes
router.post('/login', loginUser);

export default router;
