import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SubscriptionDto } from "./dto/subscription.dto";
import { Subscription } from "src/core/models/subscription.schema";
import { SubscriptionService } from "./subscription.service";
import {  ObjectId } from "mongoose"
import { PaymentService } from "../payment/payment.service";
import { InjectModel } from "@nestjs/mongoose";


@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController{

constructor ( private readonly subscriptionService: SubscriptionService,
    @Inject(PaymentService) private readonly paymentService: PaymentService
){}

    @ApiResponse({type: Subscription})
    @Post('/')
    async addSubscription(@Body() subcriptionDto: SubscriptionDto): Promise<Subscription>{
    // const payment = await this.paymentService.makePayment({userid: subcriptionDto.userid, paymentmean: subcriptionDto.amount})
        const subcription = this.subscriptionService.addSubscription(subcriptionDto)
        return subcription
        }

    @ApiResponse({type: Subscription})
    @Get('/')
    async getAllSubscription(): Promise<Subscription[]>{
        return this.subscriptionService.getAllSubscription()
    }


}



