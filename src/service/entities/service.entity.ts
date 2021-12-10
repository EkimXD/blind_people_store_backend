import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("SERVICE")
export class ServiceEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'service_id',
        comment: 'identifier for service id'
    })
    service_id: number;

    @Column({
        type: "varchar",
        name: "service_name",
        nullable: false,
        comment: "service name"
    })
    service_name: string;

    @Column({
        type: "varchar",
        name: "service_description",
        nullable: false,
        comment: "service description"
    })
    service_description: string;

    @Column({
        type: "varchar",
        name: "service_image",
        nullable: true,
        comment: "service image"
    })
    service_image: string;

    @Column({
        type: "varchar",
        name: "service_price",
        nullable: false,
        comment: "service price"
    })
    service_price: string;

    @ManyToOne(type => UserEntity,
        user => user.user_id,
        { nullable: false })
    user: UserEntity;

}
