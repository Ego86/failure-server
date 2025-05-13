import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { Request, Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @Post()
  async registred(@Req() req: Request, @Res() res: Response, @Body() userDto: UserDto) {
   try {
    
     const data = await this.userService.registred(userDto);
     
     if(typeof data !== "string"){
       req.cookies(data?.accessToken)
     }
     
     res.status(201)
     return data;
    } catch (error) {
      res.status(401)
     return error
    }
  }
  @Post()
  async login(@Res() res: Response, @Req() req: Request, @Body() userDto: UserDto): Promise<UserDto | string> {
    try {
      const data = await this.userService.login(userDto)
    if(typeof data !== "string"){
      req.cookies(data?.accessToken)
    }
      return data
      
    } catch (error: any) {
      res.status(404)
      return error.message 
    }

  }
}
