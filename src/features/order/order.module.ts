import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, orderSchema } from "src/core/models/order.schema";
import { Carts, cartSchema } from "src/core/models/cart.schema";
import { Product, productSchema } from "src/core/models/product.schema";
import { OrderService } from "./order.service";
import { PaymentService } from "../payment/payment.service";
import { Wallet, walletSchema } from "src/core/models/wallet.schema";
import { PaymentModule } from "../payment/payment.module";
import { WalletModule } from "../wallet/wallet.module";
import { Payment, paymentSchema } from "src/core/models/payment.schema";
import { EmailService } from "../mail/mail.service";
import { User, UserSchema } from "src/core/models/user.schema";

@Module({
    providers:[OrderService, PaymentService,EmailService],
    controllers:[OrderController],
    imports:[
        PaymentModule,
        WalletModule,
        MongooseModule.forFeature([
            {name: Order.name, schema: orderSchema},
            {name: Carts.name, schema: cartSchema},
            {name: Product.name, schema: productSchema},
            {name: Wallet.name, schema: walletSchema},
            {name: Payment.name, schema: paymentSchema},
            {name: Product.name, schema: productSchema},
            {name: User.name, schema: UserSchema }
        ])
    ]
})
export class OrderModule{}