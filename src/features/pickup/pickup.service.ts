import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Pickup, pickupDocument } from "src/core/models/pickup.schema";
import { PickupAdd } from "./dto/pickupAdd.dto";
import { PickupStatus } from "src/core/models/pickup-state.schema";
import { AddPickupPlan } from "../pickup-plan/dto/addpickup-plan.dto";
import { PickupPlan, pickupPlanDocument } from "src/core/models/pickup-plan.shema";
import { PickupPriority } from "src/core/models/pickup-priority.schema";
import { User, UserDocument } from "src/core/models/user.schema";
import { ProfileType } from "src/core/models/profile-type.schema";
import { Location, LocationDocument } from "src/core/models/location.schema";
import { Subscription } from "rxjs";
import { subscriptionDocument } from "src/core/models/subscription.schema";
import { PickupPresence } from "src/core/models/pickup-presence.schema";
import { PresenceDto } from "./dto/pickupAvailability.dto";

@Injectable()
export class PickupService{
        constructor(
            @InjectModel(Pickup.name) private pickupModel: Model<pickupDocument>,
            @InjectModel(PickupPlan.name) private pickupPlanModel: Model<pickupPlanDocument>,
            @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
            @InjectModel(User.name) private userModel: Model<UserDocument>,
            @InjectModel(Subscription.name) private subscriptionModel:Model<subscriptionDocument>

        ){}
        
   async addExpressPick(addPickupPlan: AddPickupPlan): Promise<Pickup>{
        let agentGet = '64943adb5918871d0da9d6cf'
        const userLocation = await this.locationModel.findOne({userid: addPickupPlan.userid}) 

        const pick = new this.pickupPlanModel({
            location: {
                longitude: userLocation.location[0].longitude,
                latitude: userLocation.location[0].latitude
            },
            time: addPickupPlan.time,
            userId: addPickupPlan.userid,
            agentid: agentGet

        });
        const pickupplanadded = await pick.save()
        const agent = await this.userModel.find({profileType: ProfileType.AGENT})

        
        const pickupadded = new this.pickupModel({
            location: addPickupPlan.location,
            status: PickupStatus.REQUESTED,
            priority: PickupPriority.HIGH,
            userid: addPickupPlan.userid,
            agentid: agentGet,
            pickupPlanid: pickupplanadded._id
        }).save()

        // let pickpreview = []
        // for (const d of prev){
        //     const agentName = await this.userModel.findOne({_id: d.agentid})
        //     const hour = d.time.getHours()
        //     const hour1 = hour+1
        //     const minute = d.time.getMinutes()
        //     const timeRange = hour+'h'+minute+' - '+hour1+'h'+minute
        //     pickpreview.push({
        //         pickupPlanid: d._id,
        //         time: d.time,
        //         agentName: agentName.username,
        //         timeRange: timeRange
        //     })
        // }

        return pickupadded
    
   }

    async addPickup(pickupAdd: PickupAdd): Promise<pickupDocument>{
        const pickupPlan = await this.pickupPlanModel.findOne({location:pickupAdd.location})
        const subscription = await this.subscriptionModel.findOne({userid:pickupAdd.userid})
        const today= new Date()
       if (today > subscription.endDate ){
        const pickupadded = new this.pickupModel({
            location: pickupAdd.location,
            status: PickupStatus.SUSPENDED,
            priority: pickupAdd.priority,
            observation: pickupAdd.observation,
            userid: pickupAdd.userid,
            agentid: pickupAdd.agentid,
            pickupPlanid: pickupPlan._id
        })
        return pickupadded.save()
       }
       else{
        if (pickupAdd.status == true){
            const pickup = await this.pickupModel.findOne({pickupPlanid: pickupAdd.pickupPlanid})
            const state = PickupStatus.DONE
           if (pickup) {
            const pickupadded = new this.pickupModel({
                location: pickupAdd.location,
                status: state,
                priority: pickupAdd.priority,
                observation: pickupAdd.observation,
                userid: pickupAdd.userid,
                agentid: pickupAdd.agentid,
                pickupPlanid: pickupPlan._id
            })
            return pickupadded.save()}
           else {
            const pickupadded = await this.pickupModel.findOneAndUpdate({pickupPlanid: pickupAdd.pickupPlanid},
                {status: state},
                {new: true})
                return pickupadded
            }

        }
        else{
            const pickup = await this.pickupModel.findOne({pickupPlan_id: pickupAdd.pickupPlanid})
            const state = PickupStatus.PENDING
          if(!pickup){
            const pickupadded = new this.pickupModel({
                location: pickupAdd.location,
                status: state,
                observation: pickupAdd.observation,
                userid: pickupAdd.userid,
                agentid: pickupAdd.agentid,
                pickupPlanid: pickupPlan._id

            })
            return pickupadded.save()
        }
        else{
            const pickupadded = await this.pickupModel.findOneAndUpdate({pickupPlan_id: pickupAdd.pickupPlanid},
                {status: state},
                {new: true})
                return pickupadded
        }

        }
       }
    }

    async signalPickup(userid: string, agentid: string, status: boolean): Promise<Pickup>{

        if(status == true){ 
            const state = PickupStatus.DONE
            const modifiedPickup = await this.pickupModel.findOneAndUpdate({userid: userid, agentid:agentid},{status:state},{new:true})
            return modifiedPickup.save()

        }
        else{
            const state = PickupStatus.PENDING
            const modifiedPickup = await this.pickupModel.findOneAndUpdate({userid: userid, agentid:agentid},{status:state},{new:true})
            return modifiedPickup.save()
        }
    }

    async userAvailablility(getAvailability: PresenceDto): Promise<pickupDocument>{
        const pickup = await this.pickupModel.findOne({pickupPlanid: getAvailability.pickupPlanid, userid: getAvailability.userid})
        const pickupPlan = await this.pickupPlanModel.findOne({_id: getAvailability.pickupPlanid})
        const location = await this.locationModel.findOne({userid: getAvailability.userid})

        if(!pickup && pickupPlan && getAvailability.presence == 'available'){
            
        const pickupadded = new this.pickupModel({
            location: location.location,
            status: PickupStatus.PENDING,
            priority: PickupPriority.NORMAL,
            userid: getAvailability.userid,
            agentid: pickupPlan.agentid,
            pickupPlanid: getAvailability.pickupPlanid,
            presence: PickupPresence.AVAILABLE 
        })
        return pickupadded.save()
    }
        else if(!pickup && pickupPlan && getAvailability.presence=="unavailable"){
            const pickupadded = new this.pickupModel({
                location: pickupPlan.location,
                status: PickupStatus.PENDING,
                priority: PickupPriority.NORMAL,
                userid: getAvailability.userid,
                agentid: pickupPlan.agentid,
                pickupPlanid: getAvailability.pickupPlanid,
                presence: PickupPresence.UNAVAILABLE 
            })
            return pickupadded.save()
        }

        else if (pickup && pickupPlan && getAvailability.presence == 'available'){
            const updatePickup = await this.pickupModel.findOneAndUpdate({pickupPlanid: getAvailability.pickupPlanid, userid: getAvailability.userid},
                {presence: PickupPresence.AVAILABLE },
                {new: true})
                return updatePickup
        }

        else if (pickup && pickupPlan && getAvailability.presence == 'unavailable'){
            const updatePickup = await this.pickupModel.findOneAndUpdate({pickupPlanid: getAvailability.pickupPlanid, userid: getAvailability.userid},
                {presence: PickupPresence.UNAVAILABLE },
                {new: true})
                return updatePickup
        }        
        else{
            throw new Error("Somethimg wromg went on")
        }
    }

    async getAllPickup(): Promise<Pickup[]>{
        return this.pickupModel.find().exec()
    }
}