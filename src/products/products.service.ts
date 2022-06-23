import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../model/entities/product.entities';
import { ProductDTO } from '../model/dto/products.dto';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    try {
      const response = await this.productsRepository.find();
      if (response.length === 0) {
        throw new Error('No se han ingresado productos');
      } else {
        this.logger.debug('Productos encontrados');
        return {
          status: HttpStatus.OK,
          response: response,
        };
      }
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        details: e.message,
      };
    }
  }

  async findById(id: any) {
    const response = await this.productsRepository.findBy(id);
    try {
      if (response.length === 0) {
        throw new Error(`Id: ${id.id} no existe...`);
      } else {
        this.logger.debug(`Producto con id ${id.id}`);
        return {
          status: HttpStatus.OK,
          response: response,
        };
      }
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        response: e.message,
      };
    }
  }

  async createProducts(data: ProductDTO) {
    try {
      const response = await this.productsRepository.save(data);
      this.logger.debug('Producto agregado');
      return {
        status: HttpStatus.OK,
        message: 'Producto agregado',
        response: response,
      };
    } catch (e) {
      this.logger.error('Producto no agregado');
      return {
        status: HttpStatus.BAD_GATEWAY,
        message: 'Producto no agregado',
        response: e.message,
      };
    }
  }

  async update(id: any, data: ProductDTO) {
    try {
      const response = await this.productsRepository.update(id, data);
      this.logger.debug(`Registro actualizado con id ${id}`);
      return {
        status: HttpStatus.OK,
        message: `Registro actualizado con id ${id}`,
        details: response,
      };
    } catch (e) {
      this.logger.error(`Id: ${id} no encontrado`);
      return {
        status: HttpStatus.BAD_GATEWAY,
        response: e.message,
      };
    }
  }

  async delete(id: any) {
    try {
      const response = await this.productsRepository.delete(id);
      if (response.affected === 1) {
        return {
          status: HttpStatus.OK,
          message: `Se ha borrado el producto con id: ${id} `,
          details: response,
        };
      } else {
        this.logger.error('No se encontro el id selecionado...');
        throw new Error('No se encontro el id selecionado...');
      }
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        details: e.message,
      };
    }
  }
}
