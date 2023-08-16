import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CommonService {

  handlerErrors(error:any):never{
    if(error.code === '23505')
      throw new BadRequestException(`${error.detail}`);
    throw new InternalServerErrorException()
  }
}
