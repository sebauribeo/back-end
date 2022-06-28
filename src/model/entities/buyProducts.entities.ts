import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BuyProductsEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    precio: number;
    @Column()
    cantidad: string;
    @Column()
    imagen: string;
}
