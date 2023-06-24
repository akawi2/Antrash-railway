import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendEmail( otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: "Antrash OTP send",
      text: "voici votre OTP "+otp,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async orderEmail(order: [{phoneNumber: string, username: string,name: Object, quantity: number, cost: number}]): Promise<void>{
    let text = ""
    for(const o of order){
        text = "l'utilisateur avec le username "+ o.username +" et le numero de telephone "+o.phoneNumber+" \n vient de faire une commande d'un "+ o.name+ " \n d'une quantite de "+ o.quantity+ " \n\nfaisant un total de "+ o.cost+ " Veuillez visiter votre plateforme pour plus de detail"
    }
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: "Antrash Order send",
      text: text
    };
    await this.transporter.sendMail(mailOptions);
  }
  
  async orderAllEmail(order: [{phoneNumber: string, username: string,productName: string[], productQuantity: number[], cost: number}]): Promise<void>{
    let text = "l'utilisateur avec le username "+ order[0].username +" et le numero de telephone "+order[0].phoneNumber+" \n vient de faire une commande des suivants: \n\n"
    
    //+ order[0].name+ " \n d'une quantite de "+ o.quantity


//    " \n\nfaisant un total de "+ o.cost+ " Veuillez visiter votre plateforme pour plus de detail"
    for(let i=0; i<order[0].productName.length; i++){
      text = text + order[0].productName[i] + "\t"+ order[0].productQuantity[i] + "\n"
    }

    text = text + " \n\nfaisant un total de "+ order[0].cost + "\n\n Veuillez visiter votre plateforme pour plus de detail"
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: "Antrash Order send",
      text: text
    };
    await this.transporter.sendMail(mailOptions);
  }

}