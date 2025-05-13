import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { PostDto } from "./dto/post.dto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
class PostService {
  constructor(@InjectModel(Post) private readonly postModule: typeof Post) {}
  async getAll() {
    const data = await this.postModule.findAll();
    return data;
  }
  async create(dataPost: PostDto) {
    const data = await this.postModule.create({ value: dataPost });
    return data;
  }
  async getById(id: string): Promise<Post> {
    const options = {
      where: { value: id },
    };
    const data = await this.postModule.findOne(options);
    return data;
  }
}
export default PostService;
