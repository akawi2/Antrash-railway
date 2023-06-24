import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Query } from "mongoose";
import { PickupPlan, pickupPlanDocument } from "src/core/models/pickup-plan.shema";
import { AddPickupPlan } from "./dto/addpickup-plan.dto";
import { Location,LocationDocument } from "src/core/models/location.schema";
import { User, UserDocument } from "src/core/models/user.schema";
import { Pickup, pickupDocument } from "src/core/models/pickup.schema";

@Injectable()
export class PickupPlanService{
    constructor(
        @InjectModel(PickupPlan.name)  private pickupPlanModel: Model<pickupPlanDocument>,
        @InjectModel(Location.name)  private locationModel: Model<LocationDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Pickup.name) private pickupModel: Model<pickupDocument>
        ){}
            async addPickupPlan(addPickupPlan: AddPickupPlan,): Promise<pickupPlanDocument>{
                 
                const pick = new this.pickupPlanModel({
                    locationName: addPickupPlan.locationName,
                    time: addPickupPlan.time,
                    userid: addPickupPlan.userid,
                    agentid: addPickupPlan.agentid,
                });
                return pick.save()
            }

            async getAllPickupPlan(): Promise<pickupPlanDocument[]>{
                return this.pickupPlanModel.find().exec();
            }

            async getPickPreview(): Promise<any[]>{

                const present = new Date();
                const query = {time: { 
                    $gt: present, 
                    } 
                  };
                const prev = await this.pickupPlanModel.find(query).exec();
                  
                let pickpreview = []
                for (const d of prev){
                    const agentName = await this.userModel.findOne({_id: d.agentid})
                    const hour = d.time.getHours()
                    const hour1 = hour+1
                    const minute = d.time.getMinutes()
                    const timeRange = hour+'h'+minute+' - '+hour1+'h'+minute
                    const pickupPresence = await this.pickupModel.findOne({pickupPlanid: d._id})
                    let presence = 'AVAILABLE'
                    let type = 'NORMAL'
                     if(pickupPresence){
                         presence = pickupPresence.presence
                         type = pickupPresence.priority
                     }
                     
    
       

                    pickpreview.push({
                        pickupPlanid: d._id,
                        time: d.time,
                        agentName: agentName.username,
                        timeRange: timeRange,
                        presence: presence,
                        type: type
                    })
                }
                return pickpreview
            }

            async updatePickupPlan(pickId:string, pick:Partial<PickupPlan>): Promise<pickupPlanDocument>{
                return this.pickupPlanModel.findOneAndUpdate({_id:pickId} , pick, { new: true });
            }

            async deletePickupPlan(id: string): Promise<pickupPlanDocument>{
                const deletePick = await this.pickupPlanModel.findByIdAndDelete(id);
                return deletePick
            }
}
