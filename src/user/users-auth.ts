import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

 const scrypt=promisify(_scrypt)

 @Injectable()
export class UsersAuth{

    constructor(private usersService:UserService){}

    async signup(email:string ,password:string){
       const user =await this.usersService.find(email);
        if(user){
            throw new BadRequestException("Email Already Exists /n Please try different Email")
        }

        const salt=randomBytes(8).toString("hex");

        const hash=await(scrypt(password,salt,32)) as Buffer

        const result=password+"."+hash.toString("hex")

        return result
    }

}