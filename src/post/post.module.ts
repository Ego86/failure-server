import { Module } from "@nestjs/common";
import PostController from "./post.controller";
import PostService from "./post.service";

import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./post.entity";

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
class PostModule {}
export default PostModule;
