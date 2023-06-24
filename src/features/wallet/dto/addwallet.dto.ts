import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsPhoneNumber } from "class-validator"
import { ObjectId } from "mongoose"

export class AddWallet{
    @ApiProperty()
    @IsNotEmpty()
    userid: ObjectId 

    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string 
    
    @ApiProperty()
    @IsNotEmpty()
    amount: number
}
