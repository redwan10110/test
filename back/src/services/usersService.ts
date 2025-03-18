import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { CreateUserDto } from '../dtos/IUserDto';
import { createCredential } from '../services/ credentialsService';

const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.find({ relations: ['turns', 'credentials'] });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOne({ where: { id }, relations: ['turns', 'credentials'] });
};

export const createUser = async (dto: CreateUserDto): Promise<User> => {
  const user = userRepository.create(dto);
  const savedUser = await userRepository.save(user);

  // Crear credenciales después de guardar el usuario
  await createCredential({ username: dto.username, password: dto.password });

  return savedUser;
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
  return await userRepository.findOne({ where: { username } });
};
