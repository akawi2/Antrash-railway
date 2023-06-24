import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Notification, NotificationDocument } from "src/core/models/notification.schema";
import { AddNotification } from "./dto/notification.dto";

@Injectable()
export class NotificationService{
    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument> 
    ){}

    async addNotification(addNotification: AddNotification): Promise<NotificationDocument>{
        const newNotification = new this.notificationModel({
            title: addNotification.title,
            message: addNotification.message,
            dateFrom: addNotification.dateFrom,
            dateTill: addNotification.dateTill,
            userid: addNotification.userid
        });
        return newNotification.save()
    }

    async updateNotification(id: ObjectId, modifiedNotification: AddNotification): Promise<NotificationDocument>{
        const modifyNotification = await this.notificationModel.findOneAndUpdate({_id:id},
                modifiedNotification,
            {new: true})
        return modifyNotification 
    }
}