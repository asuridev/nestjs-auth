import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashAdapter } from "./hash.adapter";
import { CommonService } from "../../common/common.service";

@Injectable()
export class AuthUserService{

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly hashAdapter:HashAdapter,
    private readonly commonService:CommonService
  ){}
  
  async validateUser(email:string, password:string){
    let user:User;
    try {
      user = await this.userRepository.findOneBy({email});
    } catch (error) {
      this.commonService.handlerErrors(error);
    }
    if(!user) throw new UnauthorizedException();
    if(!user.isActive) throw new ForbiddenException();
    const isMatch = await this.hashAdapter.compare(password, user.password)
    if(!isMatch) throw new UnauthorizedException();
    const { password:pass, ...rest } = user;
    return rest;
  }

}