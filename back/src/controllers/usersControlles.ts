import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { CreateUserDto } from "../dtos/IUserDto";
import { createCredential } from "../services/ credentialsService";
import { validateRegisterUser } from "../utils/validateUser";

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", (error as Error).message); // Agrega logs claros
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, birthdate, nDni, username, password } = req.body;

    // Validate Input
    const errors = validateRegisterUser(req.body);
    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({ error: "Email o usuario ya existe" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      birthdate,
      nDni,
      username,
      password: hashedPassword,
    });
    const savedUser = await userRepository.save(newUser);

    await createCredential({ username, password: hashedPassword });
    res.status(201).json(savedUser);
  } catch (error) {
    if ((error as any).code === "23505") {
      res.status(400).json({ error: "Duplicate key error" });
    } else {
      res.status(500).json({ error: "Error creating user" });
    }
  }
};

// Iniciar sesión de un usuario
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);

    // Buscar usuario por username
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Comparar contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Devolver un mensaje de éxito con información básica del usuario
    res.status(200).json({
      message: `User ${username} logged in successfully`,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
