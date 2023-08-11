import { Injectable,BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashAdapter } from './helpers/hash.adapter';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly  userRepository: Repository<User>,
    private readonly hashAdapter:HashAdapter,
    private readonly jwtService:JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.hashAdapter.hash(createUserDto.password);
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token:this.getToken({ sub:user.id })
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  login(user:User){
    return {
      ...user,
      token:this.getToken({ sub:user.id })
    }
  }

  getToken(payload:JwtPayload):string{
   return this.jwtService.sign(payload)
  }

  handleErrors(error:any):never{
    console.log(error);
    if(error.code === '23505')
      throw new BadRequestException(`${error.detail}`);
    throw new InternalServerErrorException()
  }

}
