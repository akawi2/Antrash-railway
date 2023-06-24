import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";


export class AddProduct{

    @ApiProperty({nullable: false, required: true})
    @IsNotEmpty()
    categoryid: ObjectId

    @ApiProperty({required: true})
    @IsNotEmpty()
    name: string

    @ApiProperty({required: true})
    @IsNotEmpty()
    availability: boolean
        
    @ApiProperty()
    @IsNotEmpty()
    stock: number

    @ApiProperty()
    @IsNotEmpty()
    price: number

    // @ApiProperty()
    // @IsNotEmpty()
    // installment: number
        
    @ApiProperty()
    image:[]
        
    @ApiProperty()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    color: [{
        name: string,
        code: string
    }]


} 