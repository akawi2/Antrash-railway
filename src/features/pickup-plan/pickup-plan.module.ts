import { Controller, Module } from "@nestjs/common";
import { PickupPlanController } from "./pickup-plan.controller";
import { PickupPlanService } from "./pickup-plan.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PickUpPlanSchema, PickupPlan } from "src/core/models/pickup-plan.shema";
import { Location,LocationSchema } from "src/core/models/location.schema";
import { User, UserSchema } from "src/core/models/user.schema";
import { Pickup, PickupSchema } from "src/core/models/pickup.schema";

@Module({
    controllers: [PickupPlanController],
   providers: [PickupPlanService],
   imports:[
    MongooseModule.forFeature([
        {name: PickupPlan.name, schema: PickUpPlanSchema},
        {name: Location.name, schema: LocationSchema},
        {name: User.name, schema: UserSchema},
        {name: Pickup.name, schema: PickupSchema}
    ])

   ]
})
export class PickupPlanModule{}