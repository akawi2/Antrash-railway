import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { Payment, paymentSchema } from "src/core/models/payment.schema";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { Wallet, walletSchema } from "src/core/models/wallet.schema";
import { WalletModule } from "../wallet/wallet.module";

@Module({
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService],
    imports: [
        WalletModule,
        MongooseModule.forFeature([
            {name: Payment.name, schema: paymentSchema},
            {name: Wallet.name, schema: walletSchema}
        ])
    ]
})
export class PaymentModule{}