import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    marca: string;
    @Column()
    detalle: string;
    @Column()
    precio: number;
    @Column()
    imagen: string;
}