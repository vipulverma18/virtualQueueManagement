import { Injectable } from '@nestjs/common';
import { User,UserDocument, UserRole } from './schema/user.schema';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}


    async create(createUserDto: CreateUserDto,pass){
        createUserDto.password=pass;
        return this.userModel.create(createUserDto)
    }

    async findAll(){
    return this.userModel.find().exec()
    }

    async findById(id){
        return this.userModel.findById(id).exec()
    }

    async find(email){
        return this.userModel.findOne({email})
    }

    // private hashPasswordd(password: string) {
    //      const salt=randomBytes(8).toString("hex");
        
    //             const hash=await(scrypt(password,salt,32)) as Buffer
        
    //             const result=password+"."+hash.toString("hex")
    // }
}
