import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet, WalletDocument } from "src/core/models/wallet.schema";
import { AddWallet } from "./dto/addwallet.dto";

@Injectable()
export class WalletService{

    constructor(
    @InjectModel(Wallet.name) private walletModel : Model<WalletDocument>
    ){}
    
    async Recharge(addToWallet: AddWallet): Promise <string>{
        const wallet = await this.walletModel.findOne({userid:addToWallet.userid})
        if(addToWallet.amount <= 50000){
            if(!wallet){
        const recharge = new this.walletModel({
                userid: addToWallet.userid,
                phoneNumber: addToWallet.phoneNumber,
                amount: addToWallet.amount
            })
            recharge.save()
            return "Felicitation vous venez de faire votre premiere recharge de votre numero "+addToWallet.phoneNumber+" Votre solde est a present de "+ addToWallet.amount
        }
        else{
            const recharge = await this.walletModel.findOneAndUpdate({phoneNumber: addToWallet.phoneNumber},
                    {phoneNumber: addToWallet.phoneNumber,
                    amount: wallet.amount + addToWallet.amount},
                {new:true})
                const newsolde = ( wallet.amount + addToWallet.amount)
                return "De numero "+addToWallet.phoneNumber+". Votre solde precedent etait de "+wallet.amount+". Votre solde a present est de "+newsolde
            }
        }
        else{
            throw new Error('Vous ne pouvez pas faire un retrait de plus de 50 000 F')
        }

    }
    
    }