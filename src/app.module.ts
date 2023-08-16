import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environments } from './environments';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:environments[process.env.NODE_ENV] || '.env',
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
        return {
          type:'postgres',
          host:configService.get('DB_HOST'),
          port:+configService.get('DB_PORT'),
          database:configService.get('DB_NAME'),
          username:configService.get('DB_USER'),
          password:configService.get('DB_PASSWORD'),
          autoLoadEntities:true,
          synchronize:false
        }
      }
    }),
    AuthModule,
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
