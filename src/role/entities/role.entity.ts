import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("ROLE")
export class RoleEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'role_id',
        comment: 'identifier for role id'
    })
    role_id: number;

    @Column({
        type: "varchar",
        name: "role_name",
        nullable: false,
        comment: "Role name"
    })
    role_name: string;

    @Column({
        type: "varchar",
        name: "role_description",
        nullable: true,
        comment: "Role description"
    })
    role_description: string;

    @OneToMany(type => UserEntity, user => user.user_id)
    @JoinTable()
    user: UserEntity[]

    public static getDefaultRole():RoleEntity{
        let defaultRole=new RoleEntity();
        defaultRole.role_id = 1;
        defaultRole.role_name = "user";
        defaultRole.role_description = "Role assigned to users";
        return defaultRole;
    }
}
