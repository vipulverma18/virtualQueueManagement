import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from '@nestjs/mongoose';
import { User,UserSchema } from './schema/user.schema';
import { UsersAuth } from '../auth/auth.service';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService,UsersAuth],
  exports:[UserService]
})
export class UserModule {}
