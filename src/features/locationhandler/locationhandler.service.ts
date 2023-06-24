import { InjectModel } from "@nestjs/mongoose"
import { Model, ObjectId } from "mongoose"
import { Location,LocationDocument } from "src/core/models/location.schema"
import { AddLocation } from "./dto/addlocation.dto"
import { User, UserDocument } from "src/core/models/user.schema"
import { Injectable } from "@nestjs/common"
import axios from "axios"
import { cpuUsage } from "process"

@Injectable()
export class locationhandlerService
{
    constructor(
       @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
       @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async addLocation (addLocation: AddLocation): Promise<any>{
    const userLocation = await this.locationModel.findOne({userid: addLocation.userid})
    const userLocationAdded = new this.locationModel({
        userid: addLocation.userid,
        location: addLocation.location,
        locationName: addLocation.locationName,
        addressComplement: addLocation.addressComplement})

        const lon = userLocationAdded.location[0].longitude
        const lat = userLocationAdded.location[0].latitude
        const link =  'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lon
        const response = await axios.get(link)
       // const street = response.data.features[0].properties.address.street
        let data = ""
       if (response.data.address.suburb && response.data.address.tourism && response.data.address.road){  
         data =  response.data.address.suburb+', '+response.data.address.tourism+' '+response.data.address.road
        }
        else if(response.data.address.suburb && response.data.address.road){
         data =  response.data.address.suburb+', '+response.data.address.road
        }
        else if(response.data.address.suburb){
        data =  response.data.address.suburb
        }
        else{
        data = "Reesayez"
        }
    if(userLocation){
        const updateLocation= await this.locationModel.findOneAndUpdate({userid: userLocation.userid}, 
            {
                userid: addLocation.userid,
                location: addLocation.location,
                locationName: data,
                addressComplement: addLocation.addressComplement, 
            },{new: true})
        return {locationid: updateLocation._id, locationName: updateLocation.locationName}
        
    }


    else{
        const newLocation = new this.locationModel({
        userid: addLocation.userid,
        location: addLocation.location,
        locationName: data,
        addressComplement: addLocation.addressComplement,
    }).save()
    return {locationid: (await newLocation)._id, locationName: (await newLocation).locationName}

    }
  
    }

    async updateLocation(locationid: ObjectId, addressComplement: []): Promise<LocationDocument>{
        const location = await this.locationModel.findOneAndUpdate({_id: locationid}, {addressComplement:addressComplement}
            ,
            {new: true})
        return location
    }


    async updateAddLocation(locationid: ObjectId, updateLocation: AddLocation): Promise<any>{
        const location = await this.locationModel.findOne({_id: locationid})
        const lon = 9.69925915
        const lat = 11.05037126 
        const link =  'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+lat+'&lon='+lon
        const response = await axios.get(link)
       // const street = response.data.features[0].properties.address.street
        let data = ""        
        if (response.data.address.suburb && response.data.address.tourism && response.data.address.road){  
            data =  response.data.address.suburb+', '+response.data.address.tourism+' '+response.data.address.road
           }
           else if(response.data.address.suburb && response.data.address.road){
            data =  response.data.address.suburb+', '+response.data.address.road
           }
           else if(response.data.address.suburb){
           data =  response.data.address.suburb
           }
           else{
           data = "Reessayez"
           }

           const updatedLocation = this.locationModel.findOneAndUpdate({_id: locationid},
            {userid: updateLocation.userid,
                location: updateLocation.location,
                locationName: data,
                addressComplement: updateLocation.addressComplement
            },
            {new: true})

        return updatedLocation
    }   



}