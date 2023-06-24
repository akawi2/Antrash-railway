import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { PickupPlanService } from "./pickup-plan.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { PickupPlan, pickupPlanDocument } from "src/core/models/pickup-plan.shema";
import { AddPickupPlan } from "./dto/addpickup-plan.dto";

@ApiTags('pickupPlan')
@Controller('pickupPlan')
export class PickupPlanController{
constructor(
    private readonly pickupPlanService:  PickupPlanService
){}    

@ApiResponse({ type: PickupPlan })
@Post('/')
addPicks(@Body() dto: AddPickupPlan): Promise<pickupPlanDocument>{
    try{
        const addPick =  this.pickupPlanService.addPickupPlan(dto);
        return addPick
    }
    catch(e){
        throw new Error('You cannot add a pick new up plan')
    }
}

@Get('all')
allPick(): Promise<pickupPlanDocument[]>{
    return this.pickupPlanService.getAllPickupPlan();
}

@Get('preview')
previewPick(): Promise<any[]>{
    return this.pickupPlanService.getPickPreview();
}

@Patch('update/:id')
updatePick(@Param('id') id:string, @Body() pickdto:AddPickupPlan ): Promise<pickupPlanDocument>{
    const pickUpdate = this.pickupPlanService.updatePickupPlan(id, {locationName:pickdto.locationName,time:pickdto.time});
    if(!pickUpdate){
        throw new NotFoundException("This user can't be updated")
    }
    return pickUpdate;
}

@Delete('delete/:id')
delete(@Param('id') id: string): Promise<pickupPlanDocument>{
    const deletePick = this.pickupPlanService.deletePickupPlan(id);
    if(!deletePick){
        throw new NotFoundException('Pick Up id not found')
    }
    return deletePick;

}

}