import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, ObjectId, Types } from "mongoose";

export type OrderDocument = HydratedDocument<Order>
@Schema({
    timestamps: true,
    versionKey: false
})
export class Order{
    @ApiProperty()
    @Prop({type: mongoose.Schema.Types.ObjectId, required:true})
    userid: ObjectId

    @ApiProperty({
        type: [Object],
      })
    @Prop({ref: 'carts',  required:true})
    product: [{
        productid: ObjectId,
        quantity: number,
    }]

    @ApiProperty()
    @Prop({required: true})
    cost: number

    // @Prop()
    // @ApiProperty({nullable: false})
    // installment: number

    // @ApiProperty({nullable: false})
    // @Prop({required: true, default: 0})
    // installementPaid: number

    @ApiProperty()
    @Prop({type: mongoose.Schema.Types.ObjectId,  unique: true, ref: "payments "})
    paymentid: ObjectId

    @ApiProperty()
    @Prop({required: true, default: false})
    paymentComplete: boolean

    @ApiProperty({ nullable:false})
    @Prop({type: Date, default: Date.now})
    createdAt: Date

}

export const orderSchema = SchemaFactory.createForClass(Order)