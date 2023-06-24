import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, ObjectId } from "mongoose"
import { Subscription, subscriptionDocument } from "src/core/models/subscription.schema"
import { SubscriptionDto } from "./dto/subscription.dto"
import { Payment, PaymentDocument } from "src/core/models/payment.schema"
import { Wallet, WalletDocument } from "src/core/models/wallet.schema"

@Injectable()
export class SubscriptionService{
constructor (
    @InjectModel(Subscription.name)  private subscriptionModel : Model<subscriptionDocument>,
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
    ){}
async addSubscription(subscription: SubscriptionDto) : Promise<Subscription> {
    const newSubscription = new this.subscriptionModel({
    userid: subscription.userid,
    phoneNumber: subscription.phoneNumber,
    amount: subscription.amount,
    })

return newSubscription.save()
}

async getAllSubscription(): Promise<subscriptionDocument[]>{
    const subcription = await this.subscriptionModel.find().exec()
    return subcription
}

// async makePayment(userId:ObjectId, paymentMean:number): Promise<PaymentDocument>{
//     const wallet = await this.walletModel.findOne({userid: userId});
//     if (paymentMean <= wallet.amount){
//         const payment = new this.paymentModel({ 
//             userid: userId,
//             paymentmean: paymentMean,
//             })
//         await this.walletModel.findOneAndUpdate({userid:userId}, {amount: wallet.amount-paymentMean},{new:true})
//         return payment.save()
//     }
//     else {
//         throw new Error("Desole votre portefeuille ne contient pas assez veuillez recharger!")
//     }

// }


}