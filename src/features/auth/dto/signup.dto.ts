import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'
import { ProfileType } from "src/core/models/profile-type.schema";

export class SignupDto {
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ enum: ProfileType })
    profileType: ProfileType = ProfileType.USER
}