import express from 'express';
import {
  getAllTurnsController,
  getTurnByIdController,
  scheduleTurnController,
  updateTurnStatusController,
  getUserAppointmentsController, // ✅ Se agregó esta importación
} from '../controllers/turnsControllers';
import { simpleMiddleware } from '../Middleware/auth';

const router = express.Router();

// ✅ Nueva ruta para obtener turnos de un usuario específico
router.get('/user/:id', simpleMiddleware, getUserAppointmentsController);

// Rutas existentes
router.get('/', getAllTurnsController);
router.get('/:id', simpleMiddleware, getTurnByIdController); // Obtener turno por ID
router.post('/schedule', simpleMiddleware, scheduleTurnController); // Agendar turno
router.put('/cancel', simpleMiddleware, updateTurnStatusController); // Cancelar turno

export default router;
