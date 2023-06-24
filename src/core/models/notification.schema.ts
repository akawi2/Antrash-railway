import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, ObjectId } from "mongoose"


export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification{
    @Prop({required: true, type: Object})
    @ApiProperty()
    title: {
        french:string,
        english: string
    }

    @ApiProperty()
    @Prop({required: true, type: Object})
    message: {
        french:string,
        english: string
    } 

    @ApiProperty()
    @Prop({type: mongoose.Schema.Types.ObjectId})
    userid: ObjectId

    // @ApiProperty()
    // @Prop({enum: NotificationType})
    // userid: ObjectId

    @ApiProperty()
    @Prop({required: true})  
    dateFrom: Date

    @ApiProperty()
    @Prop({required: true})
    dateTill: Date

    @ApiProperty()
    @Prop({default: Date.now})
    createdAt: Date

}

export const NotificationSchema = SchemaFactory.createForClass(Notification) 