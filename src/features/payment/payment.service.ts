import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Payment, PaymentDocument } from "src/core/models/payment.schema";
import { AddPayment } from "./dto/addPayment.dto";
import { Wallet, WalletDocument } from "src/core/models/wallet.schema";

@Injectable()
export class PaymentService{
    constructor(
        @InjectModel(Payment.name) public paymentModel: Model<Payment>,
        @InjectModel(Wallet.name) private walletModel: Model<WalletDocument> 
    ){}

    // async makePayment(addPayment:AddPayment): Promise<Payment>{
    //     const payment = new this.paymentModel({ 
    //         userid: addPayment.userid,
    //         paymentmean: addPayment.paymentmean,

    //         })

    //     return payment.save()
    // }


    async makePayment(addPayment: AddPayment): Promise<PaymentDocument>{
        const wallet = await this.walletModel.findOne({userid: addPayment.userid});

        if (addPayment.paymentmean <= wallet.amount){
            const payment = new this.paymentModel({ 
                userid: addPayment.userid,
                paymentmean: addPayment.paymentmean,
                idType: addPayment.idType,
                paymentType: addPayment.idType
                })
            await this.walletModel.findOneAndUpdate({userid:addPayment.userid}, {amount: wallet.amount-addPayment.paymentmean},{new:true})
            return payment.save()
        }
        else {
            throw new Error("Desole votre portefeuille ne contient pas assez veuillez recharger!")
        }
    
    }


    async getAll(): Promise<PaymentDocument[]>{
        const payments = await this.paymentModel.find().exec()
        return payments
    }

    async updatePayment(updatedpay: AddPayment): Promise<PaymentDocument>{
        const paid = await this.paymentModel.findOneAndUpdate({idType: updatedpay.idType, paymentType: updatedpay.paymentType},{paymentmean: updatedpay.paymentmean,updatedAt: Date.now},{new: true})
        return paid 
    }

}