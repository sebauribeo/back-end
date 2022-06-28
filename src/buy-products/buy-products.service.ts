import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyProductsDTO } from 'src/model/dto/buyProducts.dto';
import { BuyProductsEntity } from 'src/model/entities/buyProducts.entities';
import { Repository } from 'typeorm';

@Injectable()
export class BuyProductsService {
  private logger = new Logger(BuyProductsService.name);
  constructor(
    @InjectRepository(BuyProductsEntity)
    private buyProductsRepository: Repository<BuyProductsEntity>,
  ) {}

  async findAll() {
    try {
      const response = await this.buyProductsRepository.find();
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

  async create(data: BuyProductsDTO) {
    try {
      const response = await this.buyProductsRepository.save(data);
      this.logger.debug('Producto agregado al carro de compras');
      return {
        status: HttpStatus.OK,
        message: 'Producto agregado al carro de compras',
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

  async deleteById(id: any) {
    try {
      const response = await this.buyProductsRepository.delete(id);
      if (response.affected === 1) {
        this.logger.debug('Producto eliminado del carrito de compras');
        return {
          status: HttpStatus.OK,
          message: 'Producto eliminado del carrito de compras',
          details: response,
        };
      } else {
        this.logger.error('No se encontro el id selecionado');
        throw new Error('No se encontro el id selecionado');
      }
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        details: e.message,
      };
    }
  }

  async successfullyPayment() {
    try {
      const getAllIds = await this.buyProductsRepository.find();
      const payIds = getAllIds.map((id) => id.id);
      const response = await this.buyProductsRepository.delete(payIds);
      if (response.affected >= 1) {
        this.logger.debug('Pago exitoso');
        return {
          status: HttpStatus.OK,
          message: 'Pago exitoso',
          details: response,
        };
      } else {
        this.logger.error('No se encontro el id selecionado');
        throw new Error('No se encontro el id selecionado');
      }
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        details: e.message,
      };
    }
  }
}
