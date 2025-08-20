import { ExecutionContext,CanActivate, UnauthorizedException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { Request } from "express";

@Injectable()
export class AuthGuards implements CanActivate{

    constructor(private jwtService:JwtService){}

   async  canActivate(context: ExecutionContext): Promise<boolean> {

        const request=context.switchToHttp().getRequest();
        const token=this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }

        try{
            const payload= await this.jwtService.verifyAsync(token,{
                secret:jwtConstants.secret
            })
            request.users=payload
        }


catch{
    throw new UnauthorizedException();
}
return true

    }
        private extractTokenFromHeader(request:Request){
            const [type,token]=(request.headers.authorization as string)?.split(' ')??[];
            return type=='Bearer' ? token : undefined
        
    }

}