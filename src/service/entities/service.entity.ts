import { CityEntity } from "src/city/entities/city.entity";
import { ServiceCategoryEntity } from "src/service-category/entities/service-category.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, CreateDateColumn } from "typeorm";
import { ScoreEntity } from "src/score/entities/score.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";
import { DemandServiceEntity } from "src/demand-service/entities/demand-service.entity";

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
        sc => sc.service,
        { nullable: true }) // TODO change to false
    sc: ServiceCategoryEntity;

    @ManyToMany(
        type => DemandServiceEntity,
        demandservice => demandservice.service,
        {
            cascade: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )    
    @JoinTable()
    demandservice: DemandServiceEntity[];

    @CreateDateColumn()
    createdDate: Date;

    @OneToMany(type => ScoreEntity, score => score.service)
    @JoinTable()
    score: ScoreEntity[];

    @OneToMany(type => CommentEntity, comment => comment.service, { nullable: true })
    @JoinTable()
    comment: CommentEntity[];

    public static getServiceFake(id: number): ServiceEntity {
        let service: ServiceEntity = new ServiceEntity();
        service.service_id = id
        return service;
    }

    addDemandService(dservice: DemandServiceEntity) {
        console.log(dservice, this.demandservice, this)
        if (this.demandservice == null) {
            this.demandservice = Array<DemandServiceEntity>();
        }
        if(this.demandservice.filter(element=>element.demand_id === dservice.demand_id).length===0){
            this.demandservice.push(dservice);
        }
    }
}
