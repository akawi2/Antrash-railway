import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class Profile{

    @ApiProperty()
    @IsNotEmpty()
    username: string
    
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({type: IsEmail,required: false, nullable: true})
    email: string    

}                                                                                                                                                                                                    