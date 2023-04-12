import { hash } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name : "user"})
export class User {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, 10);
        }
    }

}