import { Request, Response } from 'express';
import { getAllTurns, getTurnById } from '../services/turnService';

// Obtener todos los turnos de un usuario específico
export const getAllTurnsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ error: 'UserId is required' });
      return;
    }

    const turns = await getAllTurns({ userId: Number(userId) });
    res.status(200).json(turns);
  } catch (error) {
    console.error('Error al obtener los turnos:', error);
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
};

// Obtener un turno por ID
export const getTurnByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const turn = await getTurnById(id);

    if (!turn) {
      res.status(404).json({ error: 'Turno no encontrado' });
      return;
    }

    res.status(200).json(turn);
  } catch (error) {
    console.error('Error al obtener el turno:', error);
    res.status(500).json({ error: 'Error al obtener el turno' });
  }
};
