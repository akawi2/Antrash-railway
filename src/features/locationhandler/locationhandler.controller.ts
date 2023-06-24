import { Body, Controller, Param, Patch, Post, Put } from "@nestjs/common";
import { locationhandlerService } from "./locationhandler.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Location,LocationDocument } from "src/core/models/location.schema";
import { AddLocation } from "./dto/addlocation.dto";
import axios from 'axios';
import { ObjectId } from "mongoose";



@ApiTags('location')
@Controller('location')
export class LocationhandlerController{
    constructor(
        private readonly locationService: locationhandlerService ,
    ){}

    @Post('addLocation')
    @ApiResponse({ type: Location })
    async addLocationUser(@Body() addLocation: AddLocation): Promise<any>{
       
      const presentLocation = await this.locationService.addLocation(addLocation)
  
      return presentLocation
    }

    @Put('updateLocation/:id')
    @ApiResponse({type: Location})
    async updateLocation(@Param('id') id: ObjectId, @Body() complementAddress: []): Promise<Location>{
        return this.locationService.updateLocation(id, complementAddress)
    }

    @Patch('profileLocation/:id')
    @ApiResponse({type: Location})
    async updateCurrentLocation(@Param('id') id:ObjectId, @Body() updateLocation: AddLocation): Promise<any>{
        return this.locationService.updateAddLocation(id,updateLocation)
    }
}
