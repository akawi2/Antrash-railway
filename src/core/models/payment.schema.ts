import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, Mongoose, ObjectId } from "mongoose";
import { PaymentType } from "./paymenType.schema";

export type PaymentDocument = HydratedDocument<Payment>;
@Schema()
export class Payment{

    @ApiProperty()
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    userid: ObjectId

    @Prop()
    @ApiProperty({nullable: false})
    paymentmean: number

    @ApiProperty()
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    idType: ObjectId

    @ApiProperty()
    @Prop({ required: true})
    paymentType: PaymentType

    @Prop({type: Date, default: Date.now})
    @ApiProperty()
    createdAt: Date
    
    @Prop({type: Date, default: Date.now})
    @ApiProperty()
    updatedAt: Date

}

export const paymentSchema = SchemaFactory.createForClass(Payment);

//