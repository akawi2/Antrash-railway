import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Carts } from "src/core/models/cart.schema";
import { AddToCart } from "./dto/cart.dto";
import { ObjectId } from "mongoose";
import { Product } from "src/core/models/product.schema";

@ApiTags('cart')
@Controller('cart')
export class CartController{
    constructor(
        private readonly cartService: CartService
    ){}

    @Post('/')
    @ApiResponse({type: Carts})
    async addToCart(@Body() addCart: AddToCart): Promise<Carts>{
        return this.cartService.addcartItem(addCart)
    }

    @Patch('update/:userid;:productid')
    @ApiResponse({type: Carts})
    async updatedCart(@Param('userid') userid:ObjectId, @Param('productid') productid:ObjectId, @Body() body:{change: boolean}): Promise<Carts>{
        return this.cartService.modifiedQuantity(body.change, userid, productid);
    }
    

    @Get('/:userid')
    @ApiResponse({type: Product})
    async displayCart(@Param('userid') userid: string): Promise<Product[]>{
        return this.cartService.showCart(userid)
    }

    @Delete('/delete/:productid')
    @ApiResponse({type: String})
    async deleteProductFromCart(@Param('productid') productid: ObjectId): Promise<string>{
        return this.cartService.deleteFromCart(productid)

    }

}