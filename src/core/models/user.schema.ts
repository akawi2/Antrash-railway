import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProfileType } from "./profile-type.schema";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";
import { IsEmail } from "class-validator";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @ApiProperty()
    @Prop({required: true})
    username: string

    @ApiProperty()
    @Prop()
    @IsEmail()
    email: string
    
    @ApiProperty()
    @Prop({ unique: true, required: true , type: String})
    phoneNumber: string
    
    @ApiProperty({ enum: ProfileType })
    @Prop({ default: ProfileType.USER })
    profileType: ProfileType

    @ApiProperty({ type: Date })
    @Prop()
    phoneVerifiedAt?: Date

    @ApiProperty({ type: Date, nullable: false })
    @Prop({ default: Date.now })
    createdAt: Date

    @ApiProperty({ type: Date, nullable: false })
    @Prop({ default: Date.now })
    updatedAt: Date

    @ApiProperty({ type: Date, nullable: true })
    @Prop()
    deletedAt: Date

    
    // @ApiProperty({nullable: false})
    // @Prop()
    // location:  [Number, Number]
}

export const UserSchema = SchemaFactory.createForClass(User)
