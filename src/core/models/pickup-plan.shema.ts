import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { time } from "console";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type pickupPlanDocument = HydratedDocument<PickupPlan>

@Schema()
export class PickupPlan{
    @ApiProperty({nullable: true})
    @Prop({})
    location:  [Number, Number]

    @ApiProperty({nullable: false})
    @Prop()
    locationName: string[]

    @ApiProperty({type: Date, nullable: false})
    @Prop({type: Date})
    time: Date

    @ApiProperty({ type: Date, nullable: false })
    @Prop({ default: Date.now })
    createdAt: Date

    @ApiProperty({default: Date.now})
    @Prop({type: Date})
    updated_at:Date

    @ApiProperty()
    @Prop({type: Date})
    deleted_at:Date

    @ApiProperty()
    @Prop({ required: false,nullable : true, type: mongoose.Schema.Types.ObjectId })
    agentid:ObjectId

    @ApiProperty()
    @Prop({ required: false,nullable : true, type: mongoose.Schema.Types.ObjectId })
    userid: ObjectId
}

export const PickUpPlanSchema = SchemaFactory.createForClass(PickupPlan)

