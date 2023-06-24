import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { PickupPriority } from "src/core/models/pickup-priority.schema";
import { PickupStatus } from "src/core/models/pickup-state.schema";


export class PickupAdd{
 
    @ApiProperty({required: true})
    @IsNotEmpty()
    location:  [Number, Number]
    
    @ApiProperty({type: Boolean})
    status: Boolean

    @ApiProperty({enum: PickupPriority})
    priority: PickupPriority

    @ApiProperty({type: String})
    @IsNotEmpty()
    presence: string

    @ApiProperty()
    observation: string
 

    @ApiProperty({required: true, type: mongoose.Schema.Types.ObjectId} )
    pickupPlanid: ObjectId 

    @ApiProperty({required: true, type: mongoose.Schema.Types.ObjectId} )
    userid: ObjectId 

    @ApiProperty({required: true, type: mongoose.Schema.Types.ObjectId})
    agentid: ObjectId
    
}

