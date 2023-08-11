import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashAdapter } from "./hash.adapter";

@Injectable()
export class AuthUserService{

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly hashAdapter:HashAdapter,
  ){}
  
  async validateUser(email:string, password:string){
    let user:User;
    try {
      user = await this.userRepository.findOneBy({email});
    } catch (error) {
      this.handleErrors(error)
    }
    if(!user) throw new UnauthorizedException();
    if(!user.isActive) throw new ForbiddenException();
    const isMatch = await this.hashAdapter.compare(password, user.password)
    if(!isMatch) throw new UnauthorizedException();
    const { password:pass, ...rest } = user;
    return rest;
  }

  handleErrors(error:any):never{
    console.log(error);
    if(error.code === '23505')
      throw new BadRequestException(`${error.detail}`);
    throw new InternalServerErrorException();
  }
}