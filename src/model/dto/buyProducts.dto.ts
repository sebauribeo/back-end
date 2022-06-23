import { IsNumber, IsString } from "class-validator";


export class BuyProductsDTO {
    @IsString()
    name: string;
    @IsNumber()
    precio: number;
    @IsString()
    imagen: string;
}