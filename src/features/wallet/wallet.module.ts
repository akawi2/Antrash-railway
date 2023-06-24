import { Module } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { Wallet, walletSchema } from "src/core/models/wallet.schema";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
providers: [WalletService],
controllers: [WalletController],
imports: [
    MongooseModule.forFeature([
        {name: Wallet.name, schema: walletSchema},
    ])
]
})
export class WalletModule{}