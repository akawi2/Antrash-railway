import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, categorySchema } from "src/core/models/category.schema";

@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    imports: [
        MongooseModule.forFeature([
            {name: Category.name, schema: categorySchema }
        ])
    ]
})
export class CategoryModule{}