import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("USER")
export class UserEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'user_id',
        comment: 'identifier for user id'
    })
    user_id: number;

    @Column({
        type: "varchar",
        name: "user_name",
        nullable: false,
        comment: "User name"
    })
    user_name: string;

    @Column({
        type: "varchar",
        name: "user_email",
        nullable: false,
        comment: "user email"
    })
    user_email: string;

    @Column({
        type: "varchar",
        name: "user_password",
        nullable: false,
        comment: "user account password"
    })
    password: string;

    @Column({
        type: "varchar",
        name: "user_phone",
        nullable: false,
        comment: "user's phone"
    })
    user_phone: string;

    @Column({
        type: "float",
        name: "blind_discapacity_percentage",
        nullable: false,
        comment: "user's phone"
    })
    blind_discapacity_percentage: number;
    
}
