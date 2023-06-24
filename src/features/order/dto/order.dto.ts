import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import mongoose, { ObjectId } from "mongoose"

export class AddOrder{
    @ApiProperty()
    @Prop({type: mongoose.Schema.Types.ObjectId, required:true, unique: true})
    userid: ObjectId

    @ApiProperty({
        type: [Object],
      })
      @IsNotEmpty()
    product: [{
        productid: ObjectId,
        quantity: number,
    }]


}