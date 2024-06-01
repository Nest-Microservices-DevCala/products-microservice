import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  @MessagePattern({ cmd: 'create_product' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  // findAll( @Query() paginationDto: PaginationDto ) {
  @MessagePattern({ cmd: 'find_all_products' })
  findAll( @Payload() paginationDto: PaginationDto ) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  @MessagePattern({ cmd: 'find_one_product' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
  @MessagePattern({ cmd: 'update_product' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  @MessagePattern({ cmd: 'delete_product' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
