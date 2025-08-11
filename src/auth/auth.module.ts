import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersAuth } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports:[JwtModule.register({
    global:true,
    secret:jwtConstants.secret,
    signOptions:{expiresIn:"60s"}
  }),UserModule],
  controllers: [AuthController],
  providers: [UsersAuth]
})
export class AuthModule {}
