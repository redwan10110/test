import { AppDataSource } from "../config/data-source";
import { Turn } from "../entities/Turn";
import { CreateTurnDto } from "../dtos/ITurnDto";
import { User } from "../entities/User"; // ✅ Importar la entidad User

// Obtener dinámicamente el repositorio
const getTurnRepository = () => AppDataSource.getRepository(Turn);
const getUserRepository = () => AppDataSource.getRepository(User); // ✅ Repositorio de User

// Obtener todos los turnos de un usuario
export const getAllTurns = async (filter: {
  userId?: number;
}): Promise<Turn[]> => {
  const query = getTurnRepository().createQueryBuilder("turn");

  if (filter.userId) {
    query.where("turn.userId = :userId", { userId: filter.userId });
  }

  return await query.getMany();
};

// Obtener un turno por ID
export const getTurnById = async (id: number): Promise<Turn | null> => {
  return await getTurnRepository().findOne({
    where: { id },
    relations: ["user"],
  });
};

// Crear un nuevo turno con validación de usuario
export const createTurn = async (dto: CreateTurnDto): Promise<Turn> => {
  const user = await getUserRepository().findOne({ where: { id: dto.userId } });

  if (!user) {
    throw new Error("❌ Error: Usuario no encontrado");
  }

  const turn = getTurnRepository().create({
    date: dto.date,
    time: dto.time,
    status: dto.status ?? true,
    description: dto.description,
    user, // ✅ Se asigna el objeto user en lugar de solo el id
  });

  return await getTurnRepository().save(turn);
};

// Actualizar el estado de un turno
export const updateTurnStatus = async (
  id: number,
  status: boolean
): Promise<Turn | null> => {
  const turn = await getTurnRepository().findOneBy({ id });

  if (!turn) {
    return null;
  }

  turn.status = status; // ✅ Ahora status es booleano directamente
  return await getTurnRepository().save(turn);
};
