import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, ObjectId, Types } from "mongoose";

export type CartDocument = HydratedDocument<Carts>
@Schema({
    timestamps: true,
    versionKey: false
})
export class Carts{
    @ApiProperty()
    @Prop({type: mongoose.Schema.Types.ObjectId, required:true, unique: true})
    userid: ObjectId

    @ApiProperty({
        type: [Object],
      })
    @Prop({ref: 'products',  required:true})
    product: [{
        productid: ObjectId,
        quantity: number,
    }]

    @ApiProperty({ nullable:false})
    @Prop({type: Date, default: Date.now})
    createdAt: Date

    @ApiProperty({ nullable:false})
    @Prop({type: Date, default: () => new Date(new Date().setMonth(new Date().getDay() + 3)) })
    expiresIn: Date

}

export const cartSchema = SchemaFactory.createForClass(Carts)