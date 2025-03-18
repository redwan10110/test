// dtos/IUserDto.ts
export interface CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
  birthdate?: Date | null;
  nDni?: string | null;
}
