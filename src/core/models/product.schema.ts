import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, Mongoose, ObjectId } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;
@Schema()
export class Product{
    @ApiProperty({nullable: false})
    @Prop({type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category'})
    categoryid: ObjectId

    @ApiProperty({nullable: false})
    @Prop({required: true, type: Object})
    name: {
        french: string,
        english: string
    }

    @ApiProperty()
    @Prop()
    availability: boolean
    
    @Prop()
    @ApiProperty({nullable: false})
    stock: number

    // @Prop()
    // @ApiProperty({nullable: false})
    // installment: number

    @Prop()
    @ApiProperty({nullable: false})
    price: number

    @Prop({ default: null})
    @ApiProperty({type: []})
    image: []

    @Prop({ type: Object, default: null})
    @ApiProperty()
    description: {
        french: string,
        english: string
    }

    @Prop()
    @ApiProperty({type: [Object]})
    color: [{
        name: string,
        code: string
    }]

    @Prop({type: Date, default: Date.now})
    @ApiProperty()
    createdAt: Date

    @Prop({type: Date, default: Date.now})
    @ApiProperty()
    updated_at: Date

}

export const productSchema = SchemaFactory.createForClass(Product);

  