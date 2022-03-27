import { CityEntity } from "src/city/entities/city.entity";
import { ServiceCategoryEntity } from "src/service-category/entities/service-category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity,JoinTable, OneToMany,ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { ScoreEntity } from "src/score/entities/score.entity";

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

    @ManyToOne(type => CityEntity,
        city => city.service,
        { nullable: true }) // TODO change to false
    city: CityEntity;

    @ManyToOne(type => ServiceCategoryEntity,
        sc => sc.sc_id,
        { nullable: true }) // TODO change to false
    sc: ServiceCategoryEntity;

    @OneToMany(type => ScoreEntity, score => score.service) 
    @JoinTable()
    score: ScoreEntity[];

    public static getServiceFake(id:number):ServiceEntity{
        let service: ServiceEntity = new ServiceEntity();
        service.service_id=id
        return service;
    }
}
