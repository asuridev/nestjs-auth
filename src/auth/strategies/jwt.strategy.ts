import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    consfigService:ConfigService
  ){
    super({
      secretOrKey:consfigService.get('JWT_SECRET'),
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(jwtPayload:JwtPayload){
    const { sub:id } = jwtPayload;
    const user:User = await this.userRepository.findOneBy({id});
    if(user && user.isActive){
      const {password, ...rest} = user;
      return rest;
    };
    throw new UnauthorizedException();
  }
    
}