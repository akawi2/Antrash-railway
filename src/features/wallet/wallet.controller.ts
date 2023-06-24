import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Wallet } from "src/core/models/wallet.schema";
import { AddWallet } from "./dto/addwallet.dto";

@ApiTags('wallet')
@Controller('wallet')
export class WalletController{
    constructor(
        private walletService: WalletService
    ){}

@Post('/')
@ApiResponse({type: Wallet})
async Recharge(@Body() addWallet:AddWallet): Promise<string>{
        return this.walletService.Recharge(addWallet)
    }

}