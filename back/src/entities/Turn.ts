import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "varchar", length: 20 })
  time: string;

  @Column({ type: "boolean", default: true })
  status: boolean;

  @Column({ type: "varchar", length: 3000 })
  description: string;

  @ManyToOne(() => User, (user) => user.turns, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;
}
