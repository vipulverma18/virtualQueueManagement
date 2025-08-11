import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { JwtService } from "@nestjs/jwt";

 const scrypt=promisify(_scrypt)

 @Injectable()
export class UsersAuth{

    constructor(private usersService:UserService,
        private jwtService:JwtService
    ){}

    async signup(email:string ,password:string){
       const user =await this.usersService.find(email);
        if(user){
            throw new BadRequestException("Email Already Exists /n Please try different Email")
        }

        const salt=randomBytes(8).toString("hex");

        const hash=await(scrypt(password,salt,32)) as Buffer

        const result=salt+"."+hash.toString("hex")

        return result
    }

    async signin(email:string ,password:string){
        const users=await this.usersService.find(email);

        if(!users){
            throw  new NotFoundException("Email not found");
        }

        const [salt,storedHash]=users.password.split('.');

        const newHash=await (scrypt(password,salt,32))as Buffer;

        if(newHash.toString("hex")!==storedHash){

            throw new BadRequestException("Incorrect Password");
        }

        const payload={user_id:users.id,email_Id:email}


        return {
           access_token: await this.jwtService.signAsync(payload)
        }

    }

}