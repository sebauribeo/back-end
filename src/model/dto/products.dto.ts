import { IsString, IsNumber } from 'class-validator';


export class ProductDTO {
    @IsNumber()
    id: number;
    @IsString()
    nombre: string;
    @IsString()
    marca: string;
    @IsString()
    detalle: string;
    @IsNumber()
    precio: number;
    @IsString()
    imagen: string;
}