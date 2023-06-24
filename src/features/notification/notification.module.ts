import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/core/models/notification.schema';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
    providers:[NotificationService],
    controllers:[NotificationController],
    imports: [
        MongooseModule.forFeature([
            {name: Notification.name, schema: NotificationSchema},
        ])
    ],
})
export class NotificationModule {}
