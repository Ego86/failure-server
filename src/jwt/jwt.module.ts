import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import  { JwtService }  from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // Замените на ваш секретный ключ
      
    }),
   
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}