import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddProduct } from "./dto/product.dto";
import { Product, ProductDocument } from "src/core/models/product.schema";

@Injectable()
export class ProductService{
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ){}

    async displayProducts(): Promise<Product[]>{
        const products = await this.productModel.find().exec()
        return products
    }
    async addProduct(addPayment:AddProduct): Promise<Product>{
        const product = new this.productModel({ 
            categoryid: addPayment.categoryid,
            name: addPayment.name,
            availability: addPayment.availability,
            stock: addPayment.stock,
            price: addPayment.price,
            // installment: addPayment.installment,
            color: addPayment.color,
            image: addPayment.image,
            description: addPayment.description,        
            })

        return product.save()
    }

    async deleteProduct(id: string): Promise<ProductDocument>{
        const productDelete = await this.productModel.findOneAndDelete({_id: id})
        return productDelete
    }

    async UpdateProduct(id: string, modifiedProduct:Partial<Product>): Promise<ProductDocument>{
        const product = await this.productModel.findOneAndUpdate({_id: id},modifiedProduct,{new: true})
        return product
    }
}