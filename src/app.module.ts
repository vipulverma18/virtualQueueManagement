import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://vipul:vipul123@localhost:27017/mongodb?authSource=admin'), UserModule
,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
