import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type LocationDocument = HydratedDocument<Location>

@Schema()
export class Location {    
    @ApiProperty()
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userid: ObjectId

    @ApiProperty({nullable: true, type: [Object], })
    @Prop()
    location:  [{
        longitude: number,
        latitude: number,
    }]

    @ApiProperty()
    @Prop({type: Number, default: 1})
    type: number

    @ApiProperty({nullable: true})
    @Prop()
    locationName: string

    @ApiProperty({nullable: true})
    @Prop({type: []})
    addressComplement: []

    @ApiProperty({ type: Date, nullable: true })
    @Prop({ default: Date.now })
    createdAt: Date

}

export const LocationSchema = SchemaFactory.createForClass(Location)
