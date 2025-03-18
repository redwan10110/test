import { Router } from 'express';
import usersRouter from './usersRouter';
import appointmentsRouter from '../routes/appointmentsRouter'; // Asegúrate de tener el archivo appointmentsRouter.ts

const router = Router();

router.use('/users', usersRouter);
router.use('/appointments', appointmentsRouter); // Cambiado para usar appointmentsRouter

export default router;
