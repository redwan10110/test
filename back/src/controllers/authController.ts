// import { Request, Response } from 'express';
// import { getRepository } from 'typeorm';
// import { User } from '../entities/User';

// export const getAuthenticatedUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Suponiendo que tienes un middleware de autenticación que agrega el ID del usuario a `req.userId`
//     const userId = req.userId;

//     if (!userId) {
//       res.status(401).json({ message: 'No autenticado' });
//       return;
//     }

//     const userRepository = getRepository(User);
//     const user = await userRepository.findOne(userId);

//     if (!user) {
//       res.status(404).json({ message: 'Usuario no encontrado' });
//       return;
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error al obtener el usuario autenticado:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };