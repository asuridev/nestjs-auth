import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashAdapter } from './helpers/hash.adapter';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasicStrategy } from './strategies/http.strategy';
import { AuthUserService } from './helpers/auth-user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashAdapter,AuthUserService,JwtStrategy, BasicStrategy],
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'1h'
          }
        }
      }
    }),
    TypeOrmModule.forFeature([ User ])
  ],
  exports:[TypeOrmModule,JwtStrategy,PassportModule,JwtModule]
})
export class AuthModule {}
