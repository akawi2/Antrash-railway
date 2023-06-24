import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";
import { PaymentType } from "src/core/models/paymenType.schema";


export class AddPayment{
    @ApiProperty()
    @IsNotEmpty()
    userid: ObjectId
        
    @ApiProperty()
    @IsNotEmpty()
    paymentmean: number
        
    @ApiProperty()
    @IsNotEmpty()
    idType: ObjectId

    @ApiProperty()
    @IsNotEmpty()
    paymentType: PaymentType
}