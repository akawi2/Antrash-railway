import { Body, Controller,Get,Inject,Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "src/core/models/order.schema";
import { AddOrder } from "./dto/order.dto";
import { Model, ObjectId } from "mongoose";
import { PaymentService } from "../payment/payment.service";
import { Wallet, WalletDocument } from "src/core/models/wallet.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Payment, PaymentDocument } from "src/core/models/payment.schema";
import { EmailService } from "../mail/mail.service";

@ApiTags('order')
@Controller('order')
export class OrderController{
    constructor(
        private readonly orderService: OrderService,
        @Inject(PaymentService) private readonly paymentService: PaymentService,
        private readonly emailService: EmailService

    ){}

    @ApiResponse({type: Order})
    @Get('/')
    async getAllOrders(): Promise<Order[]>{
        return this.orderService.getAllOrders()
    }

    @ApiResponse({type: Order})
    @Post('/')
    async addOrder(@Body() newOrder: AddOrder): Promise<[Object]>{
       // const payment =await this.paymentService.makePayment({userid: newOrder.userid, paymentmean: newOrder.cost})
          const order = await this.orderService.addOrder(newOrder)
  
          this.emailService.orderEmail(order)
          return order
    }

    
    @ApiResponse({type: Order})
    @Post('/all')
    async orderAll(@Body() userid: {userid: ObjectId} ): Promise<any>{
        const order = await this.orderService.OrderAllCart(userid.userid)
        this.emailService.orderAllEmail(order)
        return order
    }
}