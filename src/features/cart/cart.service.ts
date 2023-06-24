import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";
import { Carts, CartDocument } from "src/core/models/cart.schema";
import { AddToCart } from "./dto/cart.dto";
import { Product, ProductDocument } from "src/core/models/product.schema";

@Injectable()
export class CartService{
    constructor(
        @InjectModel(Carts.name) private cartModel: Model<CartDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ){}

    async addcartItem(cartadd: AddToCart): Promise<CartDocument>{
        const usercart = await this.cartModel.findOne({userid: cartadd.userid})
        if(!usercart){
            const cart = new this.cartModel({
                userid: cartadd.userid,
                product:[]
            })
            for(const p of cartadd.product){
                if( p.productid == cartadd.product[0].productid){
                }
                cart.product.push({
                    productid: p.productid,
                    quantity: 1,
            })
        }
        return cart.save()

    }
    else{
        const presentProductArray = usercart.product
        const productArray = cartadd.product
        for (const p of productArray){
            presentProductArray.push({
                productid: p.productid,
                quantity: 1,
            })        
        }
        const index = usercart.product.length
        const cart = await this.cartModel.findByIdAndUpdate(usercart._id, 
           { userid: usercart.userid,
            product: presentProductArray },
            {new: true})

             return cart
            }
    }



    async modifiedQuantity(changequantity: boolean, userid: ObjectId, productid: ObjectId): Promise<CartDocument>{
        const usercart = await this.cartModel.findOne({userid: userid})
        if(!usercart){throw new Error('User apparently not found')}
        const productArray = usercart.product

        if(changequantity==true){    
            for (const p of productArray){
                if(p.productid == productid){
                    p.quantity = p.quantity+1
                }
            }
            const updateCart = this.cartModel.findOneAndUpdate({userid: userid },
                 {
                    userid: usercart.userid,
                    product:productArray
                 },
                {new: true})
                return updateCart
        }
        else if (changequantity==false){
            for (const p of productArray){
                if(p.productid == productid){
                    p.quantity = p.quantity-1   
                }
            }
            const updateCart = this.cartModel.findOneAndUpdate({userid: userid },
                 {
                    userid: usercart.userid,
                    product:productArray
                 },
                {new: true})
                return updateCart
        }
    }

    async showCart(userid: string): Promise<Product[]>{
        const usercart = await this.cartModel.findOne({userid: userid})
        const productInCart = usercart.product
        const products = []
        for (const p of productInCart){
            const listProducts = await this.productModel.findOne({_id: p.productid})
            if(listProducts){
                products.push(listProducts)
            }
        }
        return products
    }

    async deleteFromCart(productid: ObjectId): Promise<string>{
        const productCart = await this.cartModel.findOne({product: {productid: productid} })
        // for(const p of productCart.product){
        //     productCart.product.pop
        // }
        const arr = productCart.product
        const index = arr.findIndex((object)=>{
            return object.productid === productid
        }); 
        if (index !== -1){
            arr.splice(index, 1)
        }
        const updatedCart = await this.cartModel.findOneAndUpdate({product: {productid: productid}},{product: arr}  ,{new:true})
        return "Product removed from cart successfully"
    }
}
