import { Module } from "@nestjs/common";
import { LocationhandlerController } from "./locationhandler.controller";
import { locationhandlerService } from "./locationhandler.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Location,LocationSchema } from "src/core/models/location.schema";
import { User, UserSchema } from "src/core/models/user.schema";

@Module({
    providers: [locationhandlerService],
    controllers: [LocationhandlerController],
    imports: [
        MongooseModule.forFeature([
            {name: Location.name, schema: LocationSchema},
            {name: User.name, schema: UserSchema}
        ])
    ]
})
export class locationhandlerModule{}