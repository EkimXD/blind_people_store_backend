import { RoleEntity } from "src/role/entities/role.entity";
import { ServiceEntity } from "src/service/entities/service.entity";
import { ScoreEntity } from "src/score/entities/score.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { Column, Entity, JoinTable, ManyToOne, ManyToMany,OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        unique:true,
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
        comment: "User's blind discapacity percentage"
    })
    blind_discapacity_percentage: number;
    
    @ManyToOne(type => RoleEntity, role => role.role_id) 
    role: RoleEntity;

    @OneToMany(type => ServiceEntity, service => service.service_id) 
    @JoinTable()
    service: ServiceEntity[];

    @OneToMany(type => ScoreEntity, score => score.user) 
    @JoinTable()
    score: ScoreEntity[];

    @OneToMany(type => CommentEntity, comment => comment.user) 
    @JoinTable()
    comment: CommentEntity[];

    public static getUserFake(id:number):UserEntity{
        let user: UserEntity = new UserEntity();
        user.user_id=id
        return user;
    }

}
