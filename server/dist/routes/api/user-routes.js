// user-routes.ts
import { Router } from 'express';
import { getSingleUser, createUser, loginUser as login, saveBook, deleteBook, } from '../../controllers/user-controller.js';
import { authMiddleware } from '../../services/auth.js';
const router = Router();
router.post('/', createUser);
router.put('/', authMiddleware, saveBook);
router.post('/login', login);
router.get('/me', authMiddleware, getSingleUser);
router.delete('/books/:bookId', authMiddleware, deleteBook);
export default router;
