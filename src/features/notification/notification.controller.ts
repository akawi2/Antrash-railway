import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Notification, NotificationDocument } from "src/core/models/notification.schema";
import { AddNotification } from "./dto/notification.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";

@ApiTags('notification')
@Controller('notification')
export class NotificationController{
    constructor(
        private readonly notificationService: NotificationService
    ){}

    @Post('/')
    @ApiResponse({type: Notification})
    async addNotification(@Body() addNotification: AddNotification): Promise<NotificationDocument>{
        return  this.notificationService.addNotification(addNotification)
    }

    @Patch('update/:notificationid')
    @ApiResponse({type: Notification})
    async updateNotification(@Param('notificationid') notificationid:ObjectId,@Body() modifiedNotification: AddNotification): Promise<NotificationDocument>{
        return this.notificationService.updateNotification(notificationid,modifiedNotification)
    }
}
