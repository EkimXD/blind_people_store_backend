import { RoleEntity } from "src/role/entities/role.entity";
import { ServiceEntity } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("SCORE")
export class ScoreEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'score_id',
        comment: 'identifier for score id'
    })
    score_id: number;

    @Column({
        type: "float",
        name: "score_number",
        nullable: false,
        comment: "score"
    })
    score_number: number;

    @ManyToOne(type => UserEntity, user => user.score,
        { nullable: false }) 
    user: UserEntity;

    @ManyToOne(type => ServiceEntity, service => service.score,
        { nullable: false })
    service: ServiceEntity;

    public static getScoreFake(id:number):ScoreEntity{
        let score: ScoreEntity = new ScoreEntity();
        score.score_id=id
        return score;
    }

}
