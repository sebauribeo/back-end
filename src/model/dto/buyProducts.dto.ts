import { IsNumber, IsString } from "class-validator";


export class BuyProductsDTO {
    @IsString()
    nombre: string;
    @IsNumber()
    precio: number;
    @IsString()
    imagen: string;
}