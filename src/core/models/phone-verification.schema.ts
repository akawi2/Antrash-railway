import * as bcrypt from 'bcrypt'

import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { hashConstants } from 'src/shared/constants/hash';

export type PhoneVerificationDocument = HydratedDocument<PhoneVerification>

const ONE_MINUTE = 60 * 10
@Schema({
    collection: 'phone_verifications',
    expireAfterSeconds: ONE_MINUTE,
})
export class PhoneVerification {
    @ApiProperty()
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    userId: ObjectId

    @ApiProperty()
    @Prop({ required: true, expires: ONE_MINUTE })
    otp: string

    @ApiProperty()
    @Prop({ required: true })
    timestamp: Date

    @ApiProperty()
    @Prop({ default: Date.now , nullable: false})
    createAt: Date

    @ApiProperty()
    @Prop({ default: Date.now, nullable: false })
    updatedAt: Date

    @ApiProperty({ type: Date, nullable: true })
    @Prop()
    deletedAt: Date
}

export const PhoneVerificationSchema = SchemaFactory.createForClass(PhoneVerification)

PhoneVerificationSchema.pre('save', function (next) {
    if (!this.isModified('otp')) return next()
    try {
        this.otp = bcrypt.hashSync(this.otp, hashConstants.bcryptSaltOrRounds)
        next()
    } catch(err) {
        next(err)
    }
})
