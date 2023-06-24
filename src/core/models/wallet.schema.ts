import { ApiProperty } from "@nestjs/swagger"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

export type WalletDocument = HydratedDocument<Wallet>

@Schema()
export class Wallet {

@ApiProperty()
@Prop({ required: true, nullable: false, type: mongoose.Schema.Types.ObjectId, unique: true })
userid: ObjectId 
    

@ApiProperty()
@Prop({ required: true, nullable: false, unique: false })
phoneNumber: string 

@ApiProperty()
@Prop({ required : true, nullable: false})
amount: number

}

export const walletSchema = SchemaFactory.createForClass(Wallet)
