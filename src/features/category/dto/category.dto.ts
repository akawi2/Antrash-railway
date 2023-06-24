import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class AddCategory{
    @ApiProperty()
    @IsNotEmpty()
    name: {
        french: string,
        english: string
    }


    @ApiProperty()
    @IsNotEmpty()
    image: string
}
