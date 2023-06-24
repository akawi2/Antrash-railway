import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import mongoose, {  ObjectId } from "mongoose";
import { PickupPresence } from "src/core/models/pickup-presence.schema";


export class PresenceDto{

    @ApiProperty({required: true, type: mongoose.Schema.Types.ObjectId} )
    @IsNotEmpty()
    pickupPlanid: ObjectId 

    @ApiProperty({required: true, type: mongoose.Schema.Types.ObjectId} )
    @IsNotEmpty()
    userid: ObjectId 

    @ApiProperty({type: String})
    @IsNotEmpty()
    presence: string
    
    
}

