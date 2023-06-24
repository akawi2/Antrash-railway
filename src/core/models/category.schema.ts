import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, ObjectId, Types } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>
@Schema()
export class Category{
    @ApiProperty({
        type: [Object],
    })
    @Prop({type: Object,unique: true})
    name: {
        french: string,
        english: string
    }

    @ApiProperty()
    @Prop({required: true})
    image: string

    @ApiProperty({ nullable:false})
    @Prop({type: Date, default: Date.now})
    createdAt: Date

}

export const categorySchema = SchemaFactory.createForClass(Category)