import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { BuyProductsDTO } from 'src/model/dto/buyProducts.dto';
import { BuyProductsService } from './buy-products.service';

@Controller('shoppingCart')
export class BuyProductsController {
    constructor(
        private buyProductService: BuyProductsService
    ) {}

    @Get()
    async getAllShoppingCart() {
        return await this.buyProductService.findAll()
    }

    @Post('/addProducts')
    async addToShoppingCart(@Body() data: BuyProductsDTO) {
        return await this.buyProductService.create(data);
    }

    @Delete('/successfullyPayment')
    async paymentSuccess() {
      return this.buyProductService.successfullyPayment();
    } 

    @Delete('/deleteProduct')
    async deleteProduct(@Query('id') id: any) {
        return this.buyProductService.deleteById(id)
    }
}
