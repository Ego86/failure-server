import { Body, Controller, Get, Post } from "@nestjs/common";
import PostService from "./post.service";
import { PostDto } from "./dto/post.dto";

@Controller("post")
class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async create(@Body() data: PostDto) {
    const postData = this.postService.create(data);
    console.log(data, postData)
    return postData;
  }
  @Get("id")
  async getById(@Body() id: string) {
    const data = this.postService.getById(id);
    return data;
  }
  @Get("all")
  async getAll() {
    return this.postService.getAll();
  }
}
export default PostController;
