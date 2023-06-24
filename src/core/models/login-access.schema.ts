import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProfileType } from "./profile-type.schema";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type LoginAccessDocument = HydratedDocument<LoginAccess>

@Schema()
export class LoginAccess {    
    @ApiProperty()
    @Prop({ unique: true })
    phoneNumber: string

    @ApiProperty()
    @Prop({ required: true })
    token: string

    @ApiProperty({ type: Date, nullable: false })
    @Prop({ default: Date.now })
    createdAt: Date

}

export const LoginAccessSchema = SchemaFactory.createForClass(LoginAccess)
