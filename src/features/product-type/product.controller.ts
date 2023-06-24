import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Payment } from "src/core/models/payment.schema";
import { ProductService } from "./product.service";
import { AddProduct } from "./dto/product.dto";
import { Product } from "src/core/models/product.schema";

@ApiTags('product')
@Controller('product')
export class ProductController{
    constructor(
        private readonly productService: ProductService
    ){}

@Post()
@ApiResponse({type: Product})
async addProduct(@Body() addProduct: AddProduct): Promise<Product>{
    const productAdded = this.productService.addProduct(addProduct)
    return productAdded
}

@Delete('delete/:id')
@ApiResponse({type: Product})
async deleteProduct(@Param('id') id:string): Promise<Product>{
    const productDeleted = this.productService.deleteProduct(id)
    return productDeleted
}

@Patch('update/:id')
@ApiResponse({type: Product})
async modifiedProduct(@Param('id') id:string, @Body() changedProduct: AddProduct): Promise<Product>{
    const productModified = this.productService.UpdateProduct(id,changedProduct)
    return productModified
}

@Get('/')
@ApiResponse({type: Product})
async displayProduct(): Promise<Product[]>{
    return this.productService.displayProducts()
    
}



} 