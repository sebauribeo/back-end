import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyProductsEntity } from './model/entities/buyProducts.entities';
import { ProductEntity } from './model/entities/product.entities';
import { ProductsModule } from './products/products.module';
import { BuyProductsModule } from './buy-products/buy-products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [ProductEntity, BuyProductsEntity],
      synchronize: true
    }),
    ProductsModule,
    BuyProductsModule,
  ],
})
export class AppModule {}
