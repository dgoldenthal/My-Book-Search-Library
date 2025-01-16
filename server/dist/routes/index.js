import express from 'express';
import userRoutes from './api/user-routes.js';
import path from 'node:path';
// import { fileURLToPath } from 'url';
const router = express.Router();
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import apiRoutes from './api/index.js';
router.use('/api', apiRoutes);
router.use('/users', userRoutes);
// serve up react front-end in production
router.use((_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
export default router;
