import { Body, Controller,Get,Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersAuth } from './users-auth';

@Controller('users')
export class UserController {
    constructor(private userService:UserService,private userAuth:UsersAuth){}

    @Post('/signup')
    async createUser(@Body() createuserdto:CreateUserDto){
        const user=await this.userAuth.signup(createuserdto.email,createuserdto.password);
        return this.userService.create(createuserdto,user)
        
    }

    @Get()
    async findUser(){
        return this.userService.findAll();
    }
}
