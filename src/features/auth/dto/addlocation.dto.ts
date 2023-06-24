import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { ObjectId } from "mongoose"

export class AddLocation{
    @ApiProperty()
    @IsNotEmpty()
    userid: ObjectId
    
    @ApiProperty({nullable: true})
    location:  [Number, Number]

    @ApiProperty({nullable: false})
    @IsNotEmpty()
    locationName:  string[]

    @ApiProperty({nullable: true})
    @IsNotEmpty()
    addressComplement: []

}
