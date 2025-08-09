import { IsString,IsEmail,IsOptional,IsEnum, IsNumber } from "class-validator";

enum gender{
male="male",
female="female",
others="others"
}

enum roles{
     customer="customer",
    admin="admin",
    staff="staff"

}

export class CreateUserDto{

    @IsString()
    name:string
    
    @IsNumber()
    phone:number

    @IsEnum(gender,{message:"Gender must be male/female/others"})
    sex:gender


    @IsEmail()
    email:string

    @IsEnum(roles)
    role:roles

    @IsString()
    password:string

}