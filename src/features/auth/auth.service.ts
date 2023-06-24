import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/core/models/user.schema';
import { SignupDto } from './dto/signup.dto';
import { ProfileType } from 'src/core/models/profile-type.schema';
import { PhoneVerification, PhoneVerificationDocument } from 'src/core/models/phone-verification.schema';
import { SigninDto } from './dto/signin.dto';
// import { bcrypt } from 'bcrypt'
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginAccess, LoginAccessDocument } from 'src/core/models/login-access.schema';
import { AddLocation } from '../locationhandler/dto/addlocation.dto';
import { Location, LocationDocument } from 'src/core/models/location.schema';
import { Profile } from './dto/profile.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { hashConstants } from 'src/shared/constants/hash';
import { sign } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(PhoneVerification.name) private phoneVerificationModel: Model<PhoneVerificationDocument>,
        @InjectModel(LoginAccess.name) private loginAccessModel: Model<LoginAccessDocument>,
        @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
       // @InjectModel(EmailVerification.name) private emailVerificationModel: Model<EmailVerificationDocument>,
        private jwtService: JwtService

    ) { }

    async create(dto: SignupDto): Promise<UserDocument> {
        if (dto.profileType == ProfileType.ADMIN || dto.profileType == ProfileType.SUPER_ADMIN) {
            throw new BadRequestException('Cannot create an account as an administrator');
        }
       const phone = await this.checkPhone(dto.phoneNumber)
       const userGet = await this.userModel.findOne({phoneNumber: phone})
       let user
        if(!userGet){
        const user = await this.insert(dto.username, phone)
        user.save()
        return user
        }
        else {
            const user = await this.userModel.findOneAndUpdate({phoneNumber: phone},{username: dto.username},{new: true})
            return user
        }
    

    }

    async checkPhone(phoneNumber:string) : Promise<any>{
        if(phoneNumber.length == 13 && phoneNumber.substring(0,4)=="+237"){
            return phoneNumber

        }
        else if(phoneNumber.length == 9 && phoneNumber.charAt(0)=="6"){
            const phonecheck = '+237'+phoneNumber
            return phonecheck
        }
        
        else{
            throw new SyntaxError("You have entered an invalid number try again")
        }
    }

    async insert(username:string, phonecheck:string) : Promise<UserDocument>{
        if(!username){
            throw new Error('Zero')
        }
    const user = new this.userModel({
         username: username,
        phoneNumber: phonecheck
            })
            return user
        }

    async createPhoneVerification(user: UserDocument): Promise<string> {
        let otp = this.generateOtp(6)
        const otpChanged = bcrypt.hashSync(otp, hashConstants.bcryptSaltOrRounds)

        const modifiedUser = await this.phoneVerificationModel.findOne({userId: user._id})
        if(modifiedUser){
            await this.phoneVerificationModel.findOneAndUpdate({userId: user._id},
                {otp: otpChanged},
                {new: true})

        }
        else{
            const verification = new this.phoneVerificationModel({
                userId: user._id,
                otp: otp,
                timestamp: new Date()
            })
            await verification.save()

        }
        return otp
    }

    private generateOtp(length: number): string {
        const characters = '0123456789';
        let otp = '';

        for (let i = 0; i < length; i++) {
            otp += characters[Math.floor(Math.random() * characters.length)];
        }

        return otp;
    }


    async login(signin: SigninDto): Promise<Object>{
        const user = await this.userModel.findOne({phoneNumber: signin.phoneNumber});
        if (!user) {
            throw new Error('You are not registered in the database');
          }
        const userVerification = await this.phoneVerificationModel.findOne({userId: user._id});
        const login = await this.loginAccessModel.findOne({phoneNumber: signin.phoneNumber})

        

      
        const isOtpValid = await bcrypt.compare(signin.otp, userVerification.otp);

        if (!isOtpValid) {
          throw new Error('Wrong OTP, please try again');
        }
        else{
            const token = this.jwtService.sign({id: userVerification.userId});
            if(login){
                await this.loginAccessModel.findOneAndUpdate({
                    phoneNumber: signin.phoneNumber,
                  }, {token: token}, {new: true});
                  const location = await this.locationModel.findOne({userid: userVerification.userId})
                  if(location){
                    return {token: token, state:"already", locationid: location._id, locationName: location.locationName};

                  }
                  else{
                    return {token: token, state: 'notyet', locationid:"location._id", locationName: "location.locationName"};
                }
    
            }
             else{
                const loginAccess = new this.loginAccessModel({
                  phoneNumber: signin.phoneNumber,
                  token: token
                });
                await loginAccess.save();
                return {token: token, state: 'notyet'};
    
             }
            
        }
        
      
      }

        async recreatePhoneVerification(user: UserDocument): Promise<string>{
            const phone = await this.checkPhone(user.phoneNumber)
            const otpGenerated = this.generateOtp(6)
            const verificationLogOtp =await this.phoneVerificationModel.findOneAndUpdate({userId:user._id}, {otp: otpGenerated}, {new:true})
            verificationLogOtp

            return otpGenerated
        }
        
        async Relogin(signupDto: SignupDto): Promise<UserDocument>{
            
            const user =await this.userModel.findOne({phoneNumber: signupDto.phoneNumber})

            if(signupDto.username!=user.username){
                const userRelogin = await this.userModel.findOneAndUpdate({_id: user._id}, {username: signupDto.username, updatedAt: Date.now()}, {new:true})
                userRelogin

                return userRelogin
            }
            else{
                return user
            }
        }

        async disconnect(phoneNumber: String): Promise<UserDocument> {
            const deletedUser = await this.loginAccessModel.deleteOne({ phoneNumber }).exec();
            if (deletedUser.deletedCount === 0) {
              throw new NotFoundException(`User with phone number ${phoneNumber} not found`);
            }
            return this.userModel.findOne({ phoneNumber }).exec();
          }

          async addLocation (addLocation: AddLocation): Promise<LocationDocument>{
            const userLocation = await this.userModel.findOne({_id: addLocation.userid})
            const userLocationAdded = await this.locationModel.findOneAndUpdate({userid:addLocation.userid},
                {
                    userid: addLocation.userid,
                    location: addLocation.location
                },
                {new:true})
             return userLocationAdded
          }

        //   EnterUserVerification(user: UserDocument, email: string ): Promise<EmailVerificationDocument>{
        //     const otp = this.generateOtp(6)
        //     const emailEnter = new this.emailVerificationModel({
        //         userid: user._id,
        //         otp: otp,
        //         email: email

        //       })

        //     return emailEnter.save()
        //   }
          async getPresentUser(userid: ObjectId): Promise<UserDocument>{
            const user = await this.userModel.findOne({_id: userid})
            return user
          }
        
          async updateOther(userid: ObjectId, profile): Promise<UserDocument>{
            const user = await this.userModel.findOne({_id: userid})
            if(profile.phoneNumber == user.phoneNumber){
                const newProfile = await this.userModel.findOneAndUpdate({_id: userid},{
                    username: profile.username,
                    email: profile.email
                },
                {new: true})
                return newProfile
            }
            else{
                throw new Error("PhoneNumber not changed")
            }
          }


        async updateProfile(userid: ObjectId, profile: Profile): Promise<UserDocument>{
            const userVerification = await this.phoneVerificationModel.findOne({userId: userid})
            const date = new Date()
                if(userVerification) {const userModified = this.userModel.findOneAndUpdate({_id: userid},

                        {username: profile.username,
                        phoneNumber: profile.phoneNumber,
                        email: profile.email,
                        updatedAt: date

                    }
                    ,{new: true})
                   
                return userModified }
                else{
                    throw new Error('User id not correct')
                }
            }
            
            
          

        //  async updateProfile(userid: ObjectId,otp: string, profile: Profile): Promise<UserDocument>{
        //     const userVerification = await this.phoneVerificationModel.findOne({userId: userid})
        //     const isOtpValid = await bcrypt.compare(otp, userVerification.otp);
        //     if(isOtpValid){
        //         const userModified = this.userModel.findOneAndUpdate({_id: userid},
        //             {
        //                 username: profile.username,
        //                 phoneNumber: profile.phoneNumber,
        //                 email: profile.email
        //             }
        //             ,{new: true})

        //         return userModified
        //     }
        //     else {
        //         throw new Error('Wrong otp')
        //     }
            
        //   }

          async addAgent(dto: SignupDto): Promise<UserDocument>{
            const agent = new this.userModel({
                username: dto.username,
                phoneNumber: dto.phoneNumber,
                profileType: ProfileType.AGENT
            })
            return agent.save()
          }
}
