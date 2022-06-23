import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductDTO } from '../model/dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService
    ){}

    @Get()
    async getProducts(){
        return await this.productService.findAll()
    };

    @Post('/productId')
    async getProductById(@Body() id: any){
        return this.productService.findById(id)
    };

    @Post('/addProducts')
    async create(@Body() data: ProductDTO) {
        return await this.productService.createProducts(data)
    };

    @Put('/updateProducts')
    async update(@Query('id') id: any, @Body() data: ProductDTO) {
        return this.productService.update(id, data);
    } 

    @Delete('/deleteProducts')
    async deleteProducts(@Query('id') id: any) {
      return this.productService.delete(id);
    } 
}

