import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Category, CategoryDocument } from "src/core/models/category.schema";
import { AddCategory } from "./dto/category.dto";
import { ReturnCategory } from "./dto/return-category.dto";

@Injectable()
export class CategoryService{
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    ){}

    async addCategory(addCategory: AddCategory): Promise<CategoryDocument>{
        const testCategory = await this.categoryModel.findOne({name: addCategory.name})
       if (!testCategory){
         const newCategory = new this.categoryModel({
            name: addCategory.name,
            image: addCategory.image
        })
        newCategory.save()
        return newCategory
        }
        else{
            throw new Error('Category already exist enter another')
        }
    }

    async updateCategory(addCategory: AddCategory, id: string): Promise<CategoryDocument>{
        const category = await this.categoryModel.findOneAndUpdate({_id: id},addCategory,{new: true} )
        if(category){
            return category
        }

        else{
            throw new Error('This name wasn\'t found')
        } 
    }

    async getAllCategories(language: string): Promise<ReturnCategory[]>{
        
        const categories = await this.categoryModel.find().exec()
        const categoryReturn = []
        if(language == 'fr'){
            for(const c of categories){
            categoryReturn.push ({
                "name": c.name.french,
                "image": c.image
            });
          }
        }
        else if(language == 'en'){
            for(const c of categories){
                categoryReturn.push ({
                    "name": c.name.english,
                    "image": c.image
                });
              }
            }
        
        return categoryReturn
    }

    async deleteCategory(id: ObjectId): Promise<string>{
        const getcategory = await this.categoryModel.findOne({_id: id})
        const category = await this.categoryModel.findOneAndDelete({_id: id})
        if(category){
            return "Category with name "+getcategory.name+" was deleted successfully"
        }
        else{
            throw new Error('This name wasn\'t found')
        } 
    }
}