import { User } from "src/user/entities/user.entity";
import { BaseEntity } from "../../config/baseEntity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Message } from "../../message/entities/message.entity";

@Entity()
export class Room extends BaseEntity {
    @Column({
        length : 150,
        unique : true
    })
    name :string
    
    @ManyToOne(() => User, (user) => user.ownedRooms)
    owner : User

    @ManyToMany(() => User,(user) => user.rooms)
    members: User[]

    @OneToMany(() => Message , (msg) => msg.room)
    messages : Message[]
}