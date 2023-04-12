import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number

    @Column({
        type: 'varchar',
        default: new Date().toISOString(),
    })
    createdAt: string;
}