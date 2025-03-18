import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Turn } from "./Turn";
import Credential from "./Credential";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 }) // Define tipo y longitud máxima
    name: string;

    @Column({ type: "varchar", length: 255, unique: true }) // Define tipo, longitud y unicidad
    email: string;

    @Column({ type: "varchar", length: 255 }) // Nuevo campo
    username: string;

    @Column({ type: "varchar", length: 255 }) // Nuevo campo
    password: string;

    @Column({ type: "date", nullable: true }) // Nuevo campo, permite nulos
    birthdate: Date | null;

    @Column({ name: 'ndni', type: "varchar", length: 20, nullable: true }) // Cambiado para que coincida con la base de datos
    nDni: string | null;

    @OneToMany(() => Turn, (turn) => turn.user)
    turns: Turn[];

    @OneToMany(() => Credential, (credential) => credential.user)
    credentials: Credential[];
}
