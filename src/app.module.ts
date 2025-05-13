import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import PostModule from "./post/post.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user/user.entity";
import { Post } from "./post/post.entity";
import { ChatGateway } from "./chat/chat.geteway";


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      username: "root",
      database: "failure_db",
      port: 3306,
      password: "Failure21500",
      models: [User, Post]
    })
    ,UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
  exports: [],
})
export class AppModule {}
