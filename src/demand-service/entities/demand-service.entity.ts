import { ServiceEntity } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("DEMAND_SERVICE")
export class DemandServiceEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'demand_id',
        comment: 'identifier for demand service id'
    })
    demand_id: number;

    @Column({
        type: "varchar",
        name: "title",
        nullable: false,
        comment: "title for demand service"
    })
    demand_title: string;

    @Column({
        type: "varchar",
        name: "description",
        nullable: false,
        comment: "description for demand service"
    })
    demand_description: string;

    @CreateDateColumn()
    createdDate: Date

    @ManyToOne(type => UserEntity, user => user.demandservice,
        { nullable: false })
    user: UserEntity;

    @ManyToMany(
        type => ServiceEntity,
        service => service.demandservice,
        
    )
    service: ServiceEntity[];

    public static getdemandFake(id: number): DemandServiceEntity {
        let demandService: DemandServiceEntity = new DemandServiceEntity();
        demandService.demand_id = +id
        return demandService;
    }

    addService(serviceId:number){
        if(this.service==null){
            this.service=Array<ServiceEntity>();
        }
        this.service.push(ServiceEntity.getServiceFake(+serviceId));
    }

}
