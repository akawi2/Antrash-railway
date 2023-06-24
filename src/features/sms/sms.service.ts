import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
  async sendSms(phoneNumber: string, otp: string): Promise<any> {
    try {
      const response = await axios.post(process.env.postSend, {
        user: process.env.user,
        password: process.env.password,
        senderid: process.env.senderid,
        sms: 'Hello from Antrash! Here is your OTP code : '+ otp,
        mobiles: phoneNumber.substring(1),
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}