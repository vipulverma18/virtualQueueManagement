import { IsString,IsEmail,IsEnum, IsNumber,Length, Matches } from "class-validator";



export enum roles{
     customer="customer",
    admin="admin",
    staff="staff"

}

export enum gender{
male="male",
female="female",
others="others"
}

export class CreateUserDto{

    @IsString()
    name:string
    
    @IsNumber()
    @Length(10,10,{message:"Phone Number must be of 10 digits"})
    @Matches(/^[0-9]+$/,{message:"Phone Number Must Contain only Digits"})
    phone:string

    @IsEnum(gender)//,{message:"Gender must be male/female/others"})
    sex:gender


    @IsEmail()
    email:string

    @IsEnum(roles)
    role:roles

    @IsString()
    password:string

}