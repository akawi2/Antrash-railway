import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Carts, cartSchema } from "src/core/models/cart.schema";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Product, productSchema } from "src/core/models/product.schema";


@Module({
    providers: [CartService],
    controllers: [CartController],
    imports: [
        MongooseModule.forFeature([
         {name: Carts.name, schema: cartSchema},
         {name: Product.name, schema: productSchema}   
        ])
    ]
})
export class CartModule{}