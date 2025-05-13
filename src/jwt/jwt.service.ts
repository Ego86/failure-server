import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';


@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
  ) {}

  generateTokens(payload: any): {accessToken: string, refreshToken: string} {
    const accessToken =  this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
    return {accessToken, refreshToken}
  }

verifyToken(token){
const decode = this.jwtService.verify(token)
if(decode.id){return ""}
}
}
