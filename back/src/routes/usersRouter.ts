import { Router } from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  loginUserController,
} from '../controllers/usersControlles';

const router = Router();

// Define las rutas
router.get('/', getAllUsersController);
router.get('/:id', getUserByIdController);
router.post('/create', createUserController); // Crear un usuario
router.post('/login', loginUserController); // Iniciar sesión

export default router;