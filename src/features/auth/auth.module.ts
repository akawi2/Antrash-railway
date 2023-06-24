import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/core/models/user.schema';
import { PhoneVerification, PhoneVerificationSchema } from 'src/core/models/phone-verification.schema';
import { LoginAccess, LoginAccessSchema } from 'src/core/models/login-access.schema';
import { JwtModule } from '@nestjs/jwt';
import { SmsService } from '../sms/sms.service';
import { EmailService } from '../mail/mail.service';
import { Location,LocationSchema } from 'src/core/models/location.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SmsService, EmailService],
  imports: [
    JwtModule.register({
      secret: "process.env.JWTSECRET",
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PhoneVerification.name, schema: PhoneVerificationSchema },
      { name: LoginAccess.name, schema: LoginAccessSchema},
      { name: Location.name, schema: LocationSchema}
    ])
  ]
})
export class AuthModule {}
