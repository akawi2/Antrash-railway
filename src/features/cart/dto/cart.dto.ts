import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ObjectId, Types } from "mongoose";

export class AddToCart{
    @ApiProperty()
    @IsNotEmpty()
    userid: ObjectId

    @ApiProperty({
        type: [Object],
      })
      @IsNotEmpty()
      product: [{
        productid: ObjectId,
      }];   
}