import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { ObjectId } from "mongoose"

export class AddLocation{
    @ApiProperty()
    @IsNotEmpty()
    userid: ObjectId
    
    @ApiProperty({nullable: true})
    location:  [{
        longitude: number,
        latitude: number,
    }]


    @ApiProperty({nullable: true})
    locationName:  string[]

    @ApiProperty({nullable: true})
    addressComplement: []


}
