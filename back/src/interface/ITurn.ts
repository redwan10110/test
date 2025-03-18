export interface IAppointment {
  id: number;
  date: string;
  time: string;
  userId: number;
  status: "active" | "cancelled";
  description: string;
}
