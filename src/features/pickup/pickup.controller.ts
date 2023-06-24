import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Pickup } from "src/core/models/pickup.schema";
import { PickupService } from "./pickup.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PickupAdd } from "./dto/pickupAdd.dto";
import { AddPickupPlan } from "../pickup-plan/dto/addpickup-plan.dto";
import { PresenceDto } from "./dto/pickupAvailability.dto";

@ApiTags('pickup')
@Controller('pickup')
export class PickupController{
    constructor (
            private readonly pickupService:PickupService,
    ){}
    
    @ApiResponse({type: Pickup})
    @Post('/')
    async addPickup(@Body() addedPickup:PickupAdd): Promise<Pickup>{
        const pickupAdded = this.pickupService.addPickup(addedPickup)
        return pickupAdded
    }

    @ApiResponse({type: Pickup})
    @Patch('update/:userid;:agentid')
    async updatePickup(@Param('userid') userid: string, @Param('agentid') agentid:string, @Body() body:{check: boolean}): Promise<Pickup>{
        const modified = this.pickupService.signalPickup(userid, agentid, body.check)
        return modified
    }

    @ApiResponse({type:Pickup})
    @Get('/')
    async getAllPicks(): Promise<Pickup[]>{
        return this.pickupService.getAllPickup()
    }

    @Post('/express')
    @ApiResponse({type: Pickup})
    async addExpressPickup(@Body() addPickupPlan: AddPickupPlan): Promise<Pickup>{
        return this.pickupService.addExpressPick(addPickupPlan)
    }
    
    @Post('/availability')
    @ApiResponse({type: Pickup})
    async presenceState(@Body() getAvailability: PresenceDto ): Promise<Pickup>{
        return this.pickupService.userAvailablility(getAvailability)
    }


    // @ApiResponse({type: Pickup})
    // @Patch('update/:userid;:agentid')
    // async updatePickup(@Param('userid') userid: ObjectId, @Param('agentid') agentid: ObjectId, @Body() status: Boolean): Promise<Pickup>{
    //         const modified = await this.pickupService.SignalPickup(userid, agentid, status)
    //         return modified
    // }


}