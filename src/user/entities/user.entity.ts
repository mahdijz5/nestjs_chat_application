import { hash } from "bcrypt";
import { BaseEntity } from "../../config/baseEntity";
import {  BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../room/entities/room.entity";
import { Message } from "src/message/entities/message.entity";


@Entity()
export class User extends BaseEntity {
    @Column({
        type: "varchar",
        length: 150,
        unique : true
    })
    email : string

    @Column({
        type: "varchar",
        length: 150,
    })
    username : string


    @Column({
        type: "varchar",
        select : false,
    })
    password: string
    
    @OneToMany(() => Room , (room) => room.owner)
    @JoinColumn()
    ownedRooms : Room[]

    @ManyToMany(() => Room,(room) => room.members)
    @JoinTable()
    rooms : Room[]

    @OneToMany(() => Message,(msg) => msg.author)
    messages : Message[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }
}