export class CreateTurnDto {
  date: string;
  time: string;
  status?: boolean;
  description: string;
  // Ahora es booleano (true = activo, false = cancelado)
  userId: number;
}
