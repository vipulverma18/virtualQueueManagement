import { Body, Controller,Get,Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersAuth } from '../auth/auth.service';
import { UserSignInDto } from './dtos/user-signin.dto';
import { AuthGuards } from 'src/auth/auth.guards';


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

     @Post('/signin')
    async userSignIn(@Body() userSignInDto:UserSignInDto){
        const user=await this.userAuth.signin(userSignInDto.email,userSignInDto.password);
        return user
    }
    @Get('/profile')
    @UseGuards(AuthGuards)
    async userProfile(@Request() req){
    return req.users
    
        
    }
}
