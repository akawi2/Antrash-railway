import { Module } from "@nestjs/common";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionService } from "./subscription.service";
import { Subscription, subscriptionSchema } from "src/core/models/subscription.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { Payment, paymentSchema } from "src/core/models/payment.schema";
import { Wallet, walletSchema } from "src/core/models/wallet.schema";
import { PaymentService } from "../payment/payment.service";

@Module({
    providers: [SubscriptionService, PaymentService],
    controllers: [SubscriptionController],
    imports: [
        MongooseModule.forFeature([
        {name: Subscription.name, schema: subscriptionSchema},
        {name: Payment.name, schema: paymentSchema},
        {name: Wallet.name, schema: walletSchema},
        
    ])
    ],
    
    })
export class SubscriptionModule {}