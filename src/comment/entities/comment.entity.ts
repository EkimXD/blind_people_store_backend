import { ServiceEntity } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, TreeChildren, TreeParent } from "typeorm";

@Entity("COMMENT")
export class CommentEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'comment_id',
        comment: 'identifier for comment id'
    })
    comment_id: number;

    @Column({
        type: "varchar",
        name: "comment",
        nullable: false,
        comment: "comment"
    })
    comment: string;

    @ManyToOne(type => ServiceEntity, service => service.comment)
    service: ServiceEntity;

    @ManyToOne(type => UserEntity, user => user.comment)
    user: UserEntity;

    @TreeChildren()
    children: CommentEntity[]

    @TreeParent()
    parent: CommentEntity

    public static getCommentFake(id:number):CommentEntity{
        let comment: CommentEntity = new CommentEntity();
        comment.comment_id=id
        return comment;
    }

}
