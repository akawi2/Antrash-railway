import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
import { ProfileType } from "src/core/models/profile-type.schema";

export class SigninDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    otp: string;

}