// import * as bcrypt from 'bcrypt'

// import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
// import { ApiProperty } from "@nestjs/swagger";
// import mongoose, { HydratedDocument, ObjectId } from "mongoose";
// import { hashConstants } from 'src/shared/constants/hash';

// export type EmailVerificationDocument = HydratedDocument<EmailVerification>

// const TEN_MINUTES = 60 * 10
// @Schema({
//     collection: 'phone_verifications',
//     expireAfterSeconds: TEN_MINUTES,
// })
// export class EmailVerification {
//     @ApiProperty()
//     @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
//     userId: ObjectId

//     @ApiProperty()
//     @Prop({required: true})
//     email: string

//     @ApiProperty()
//     @Prop({ required: true })
//     otp: string

//     @ApiProperty()
//     @Prop({ required: true })
//     timestamp: Date

//     @ApiProperty()
//     @Prop({ default: Date.now , nullable: false})
//     createAt: Date

//     @ApiProperty()
//     @Prop({ default: Date.now, nullable: false })
//     updatedAt: Date

//     @ApiProperty({ type: Date, nullable: true })
//     @Prop()
//     deletedAt: Date
// }

// export const EmailVerificationSchema = SchemaFactory.createForClass(EmailVerification)

// EmailVerificationSchema.pre('save', function (next) {
//     if (!this.isModified('otp')) return next()
//     try {
//         this.otp = bcrypt.hashSync(this.otp, hashConstants.bcryptSaltOrRounds)
//         next()
//     } catch(err) {
//         next(err)
//     }
// })
