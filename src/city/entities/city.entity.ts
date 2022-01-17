import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceEntity } from "src/service/entities/service.entity";


@Entity("CITY")
export class CityEntity {

    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
        name: 'place_id',
        comment: 'identifier for city id'
    })
    place_id: number;

    @Column({
        type: "varchar",
        name: "state",
        nullable: false,
        comment: "city state"
    })
    state: string;

    @Column({
        type: "varchar",
        name: "city",
        nullable: false,
        comment: "city name"
    })
    city: string;

    @OneToMany(type => ServiceEntity, service => service.city) 
    service: ServiceEntity[];

    public static getCityFake(id:number):CityEntity{
        let city: CityEntity = new CityEntity();
        city.place_id=id
        return city;
    }
}
