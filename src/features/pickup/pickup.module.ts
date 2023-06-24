import { Controller, Module } from "@nestjs/common";
import { PickupController} from "./pickup.controller";
import { PickupService } from "./pickup.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Pickup, PickupSchema } from "src/core/models/pickup.schema";
import { Location, LocationSchema } from "src/core/models/location.schema";
import { PickUpPlanSchema, PickupPlan } from "src/core/models/pickup-plan.shema";
import { User, UserSchema } from "src/core/models/user.schema";
import { Subscription } from "rxjs";
import { subscriptionSchema } from "src/core/models/subscription.schema";


@Module({
    controllers: [PickupController],
   providers: [PickupService],
   imports:[
    MongooseModule.forFeature([
        {name: Pickup.name, schema: PickupSchema},
        {name: Location.name, schema: LocationSchema},
        {name: PickupPlan.name, schema: PickUpPlanSchema},
        {name: User.name, schema: UserSchema},
        {name: Subscription.name, schema: subscriptionSchema}
    ]),

   ]
})
export class PickupModule{}