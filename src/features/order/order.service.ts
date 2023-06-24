import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Order, OrderDocument } from "src/core/models/order.schema";
import { AddOrder } from "./dto/order.dto";
import { CartDocument, Carts } from "src/core/models/cart.schema";
import { Product, ProductDocument } from "src/core/models/product.schema";
import { Payment } from "src/core/models/payment.schema";
import { User, UserDocument } from "src/core/models/user.schema";

@Injectable()
export class OrderService{
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Carts.name) private cartModel: Model<CartDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,

    ){}

    async addOrder(addOrder: AddOrder): Promise<[{phoneNumber: string, username: string,name: Object, quantity: number, cost: number}]>{
        
        const productOrder = addOrder.product[0]
        const product = await this.productModel.findOne({_id: "648c80a28b3e6a8f344d2b4e"})
        const productName = product.name
        const cost  = product.price*4

        const user = await this.userModel.findOne({_id: addOrder.userid})
        const orderadd = new this.orderModel({
            userid: addOrder.userid,
            product: addOrder.product,
            cost: cost
        }).save()


    return [{phoneNumber: user.phoneNumber,username: user.username,name: productName, quantity: 4,cost: cost}]

       }

    async OrderAllCart( userid: ObjectId): Promise<[{phoneNumber: string, username: string,productName: string[], productQuantity: number[], cost: number}]>{
        const cart = await this.cartModel.findOne({userid: userid})
        const user = await this.userModel.findOne({_id: userid})

        let cost = 0
        let productName = []
        let productQuantity = []
        for(const c of cart.product){
            const product = await this.productModel.findOne({_id: c.productid})
            cost = cost + product.price*c.quantity
            productName.push(product.name)
            productQuantity.push(c.quantity)
        }

        const order = new this.orderModel({
            userid: userid,
            product: cart.product,
            cost: cost,
        }).save()
        return [{phoneNumber: user.phoneNumber,username: user.username,productName: productName, productQuantity: productQuantity,cost: cost}]
    }

    async getAllOrders(): Promise<Order[]>{
        const orders = await this.orderModel.find().exec()
        return orders
    }
}