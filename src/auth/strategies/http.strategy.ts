import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { AuthUserService } from '../helpers/auth-user.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authUserService:AuthUserService
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    console.log({ email, password });
    const user = this.authUserService.validateUser(email, password);
    return user;
  }
}