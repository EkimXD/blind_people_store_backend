import { ServiceEntity } from "src/service/entities/service.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("SERVICE_CATEGORY")
export class ServiceCategoryEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'sc_id',
        comment: 'identifier for service id'
    })
    sc_id: number;

    @Column({
        type: "varchar",
        name: "sc_name",
        nullable: false,
        comment: "service name"
    })
    sc_name: string;

    @Column({
        type: "varchar",
        name: "sc_description",
        nullable: false,
        comment: "service description"
    })
    sc_description: string;

    @Column({
        type: "varchar",
        name: "sc_image",
        nullable: true,
        comment: "service description"
    })
    sc_image: string;

    @OneToMany(type => ServiceEntity,
        service => service.sc) 
    service: ServiceEntity[];

    public static getSCFake(id:number):ServiceCategoryEntity{
        let sc: ServiceCategoryEntity = new ServiceCategoryEntity();
        sc.sc_id=id
        return sc;
    }
}
