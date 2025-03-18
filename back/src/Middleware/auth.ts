import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

// Middleware to validate login credentials
export const validateLoginCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    (req as any).userId = user.id; // Pass user ID to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Middleware to check for duplicate email during registration
export const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required." });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      res.status(409).json({ error: "Email is already in use." });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

// Simple middleware example
export const simpleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // console.log('Simple middleware executed.');
  next();
};
