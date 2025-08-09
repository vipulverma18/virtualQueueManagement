import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import { Document } from "mongoose";

export type UserDocument=User&Document;

export enum UserRole{
    customer="customer",
    admin="admin",
    staff="staff"

}
@Schema()
export class User{
    
@Prop({required:true})
name:string

@Prop({required:true,unique:true})
email:string

@Prop({required:true,unique:true})
phone:number

@Prop({required:true})
sex:string 

@Prop({type:String,enum:UserRole,default:UserRole.customer})
role:UserRole

@Prop({required:true})
password:string

}

export const UserSchema=SchemaFactory.createForClass(User);