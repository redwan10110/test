import { Request, Response } from "express";
import {
  getAllTurns,
  getTurnById,
  createTurn,
  updateTurnStatus,
} from "../services/turnService";
import { validateAppointmentData } from "../utils/validateAppointment";

// ✅ Obtener todos los turnos de un usuario específico
export const getUserAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    let turns = await getAllTurns({ userId });

    if (!turns || turns.length === 0) {
      res.status(200).json([]);
      return;
    }

    // ✅ Mantiene `status` como boolean y solo convierte al enviar la respuesta
    const formattedTurns = turns.map((turn) => ({
      ...turn,
      statusText: turn.status ? "Activo" : "Cancelado", // ✅ Nuevo campo `statusText`
    }));

    res.status(200).json(formattedTurns);
    return;
  } catch (error) {
    console.error("❌ Error al obtener los turnos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ✅ Obtener todos los turnos
export const getAllTurnsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.query;
    let turns;

    if (userId) {
      turns = await getAllTurns({ userId: Number(userId) });
      if (!turns.length) {
        res.status(200).json([]);
        return;
      }
    } else {
      turns = await getAllTurns({});
    }

    // ✅ Mantiene `status` como boolean y solo convierte al enviar la respuesta
    const formattedTurns = turns.map((turn) => ({
      ...turn,
      statusText: turn.status ? "Activo" : "Cancelado", // ✅ Nuevo campo `statusText`
    }));

    res.status(200).json(formattedTurns);
    return;
  } catch (error) {
    console.error("❌ Error al obtener turnos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ✅ Obtener un turno por ID
export const getTurnByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const turnId = Number(req.params.id);
    if (!turnId) {
      res.status(400).json({ message: "ID de turno inválido" });
      return;
    }

    let turn = await getTurnById(turnId);
    if (!turn) {
      res.status(404).json({ message: "Turno no encontrado" });
      return;
    }

    // ✅ Mantiene `status` como boolean y solo convierte al enviar la respuesta
    const formattedTurn = {
      ...turn,
      statusText: turn.status ? "Activo" : "Cancelado",
    };

    res.status(200).json(formattedTurn);
    return;
  } catch (error) {
    console.error("❌ Error al obtener el turno:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const scheduleTurnController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { date, time, userId, status, description } = req.body;

    if (!date || !time || !userId || !description) {
      console.error(
        "❌ Error en el backend: falta un campo obligatorio.",
        req.body
      );
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    userId = Number(userId);
    if (isNaN(userId)) {
      console.error("❌ Error: userId no es un número válido:", userId);
      res.status(400).json({ message: "User ID inválido" });
      return;
    }

    // Convert date to UTC before validation
    const appointmentData = {
      date: new Date(date).toISOString().split("T")[0], // Ensure date is stored in UTC
      time,
    };

    const validationErrors = validateAppointmentData(appointmentData);
    if (validationErrors.length > 0) {
      res.status(400).json({ message: validationErrors.join(", ") });
      return;
    }

    const newTurn = await createTurn({
      date: appointmentData.date,
      time,
      userId,
      status,
      description,
    });

    res.status(201).json(newTurn);
  } catch (error) {
    console.error("❌ Error al agendar turno:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ✅ Cancelar un turno

export const updateTurnStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      console.error("❌ Falta el ID del turno en la solicitud.");
      res.status(400).json({ error: "ID del turno requerido" });
      return;
    }

    const turn = await getTurnById(id);

    if (!turn) {
      console.error("❌ Turno no encontrado con ID:", id);
      res.status(404).json({ error: "Turno no encontrado" });
      return;
    }

    // ✅ Restrict cancellation for same-day or past appointments
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set today's date to UTC midnight

    const appointmentDate = new Date(turn.date);
    appointmentDate.setUTCHours(0, 0, 0, 0); // Set appointment date to UTC midnight

    if (appointmentDate <= today) {
      console.error("❌ No se puede cancelar un turno pasado o del mismo día.");
      res.status(400).json({
        error: "No se pueden cancelar turnos del mismo día o pasados.",
      });
      return;
    }

    // ✅ Cambiar estado a `false` (cancelado) en el backend
    await updateTurnStatus(id, false);

    console.log("✅ Turno actualizado con éxito");

    res.status(200).json({ message: "Turno cancelado correctamente" });
    return;
  } catch (error) {
    console.error("❌ Error al actualizar el turno:", error);
    res.status(500).json({ error: "Error al actualizar el turno" });
  }
};
