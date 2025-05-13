import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.entity";
import { JwtModule } from "src/jwt/jwt.module";

@Module({
  imports: [SequelizeModule.forFeature([User]), JwtModule],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
