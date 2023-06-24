import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { ApiProperty, ApiResponse } from "@nestjs/swagger"
import { IsNumber, IsPhoneNumber } from "class-validator"
import mongoose, { HydratedDocument, ObjectId } from "mongoose"
import { SubscriptionState } from "./subscription-state.dto"

export type subscriptionDocument = HydratedDocument<Subscription>

@Schema({
    timestamps: true,
    versionKey: false
})
export class Subscription {

    @ApiProperty()
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId} )
    userid: ObjectId 

    @ApiProperty()
    @Prop({required: true})
    amount: number

    @ApiProperty()
    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
    paymentid: ObjectId

    @ApiProperty()
    @Prop({required: true})
    phoneNumber: String 

    @ApiProperty({type: Date})
    @Prop({required: true, default: Date.now()})
    createdAt: Date

    @ApiProperty({type: Date})
    @Prop({required: true, expires: '3d',default: () => new Date(new Date().setMonth(new Date().getMonth() + 1)) })
    endDate: Date

    @ApiProperty({required: true})
    @Prop({default : SubscriptionState.ONGOING})
    status: String 

}

export const subscriptionSchema = SchemaFactory.createForClass(Subscription)

