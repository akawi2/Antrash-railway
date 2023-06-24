import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Payment, paymentSchema } from "src/core/models/payment.schema";
import { Product, productSchema } from "src/core/models/product.schema";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [
        MongooseModule.forFeature([
            {name: Product.name, schema: productSchema}
        ])
    ]
})
export class ProductModule{}