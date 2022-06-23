import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyProductsEntity } from 'src/model/entities/buyProducts.entities';
import { BuyProductsController } from './buy-products.controller';
import { BuyProductsService } from './buy-products.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuyProductsEntity])
    ],
    providers: [BuyProductsService],
    controllers: [BuyProductsController]
})
export class BuyProductsModule {}
