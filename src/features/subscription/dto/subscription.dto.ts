import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator"
import { ObjectId } from "mongoose"

export class SubscriptionDto{
    @ApiProperty()
    userid: ObjectId
    
    @ApiProperty()
    @IsPhoneNumber()
    phoneNumber: String 
    
    @ApiProperty()
    @IsNumber()
    amount: number
    
    }