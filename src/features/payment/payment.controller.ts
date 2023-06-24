import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Payment } from "src/core/models/payment.schema";
import { AddPayment } from "./dto/addPayment.dto";
import { ObjectId } from "mongoose";

@ApiTags('payment')
@Controller('payment')
export class PaymentController{
    constructor(
        private readonly paymentService: PaymentService
    ){}

@Post('/')
@ApiResponse({type: Payment})
async makePayment(@Body() addPayment: AddPayment): Promise<Payment>{
    const paymentmade = this.paymentService.makePayment(addPayment)
    return paymentmade

}

@Get('/')
@ApiResponse({type: Payment})
async getAllPayments(): Promise<Payment[]>{
    return this.paymentService.getAll()
}
    
@Post('update')
@ApiResponse({type: Payment})
async updatePayment(@Body() updatedPayment: AddPayment): Promise<Payment>{
    return this.paymentService.updatePayment(updatedPayment)
}

} 