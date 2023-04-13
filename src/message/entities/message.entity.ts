import { User } from "src/user/entities/user.entity";
import { BaseEntity } from "../../config/baseEntity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, Tree, TreeChildren, TreeParent } from "typeorm";
import { Room } from "src/room/entities/room.entity";

@Entity()
@Tree("closure-table", {
    closureTableName: "message_closure",
})
export class Message extends BaseEntity {
    @Column({
        length : 650
    })
    content: string

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn()
    author: User

    @ManyToOne(() => Room,(room) => room.messages)
    @JoinColumn()
    room: Room

    @TreeChildren()
    children: Message[]

    @TreeParent()
    parent: Message

    @Column({ type: "bigint", default: 0 })
    depth: number

    @BeforeInsert()
    @BeforeUpdate()
    async setDepth() {
        if (this.depth && this.parent) {
            this.depth = +this.parent.depth + 1
            this.room = this.parent.room
        }
    }
}