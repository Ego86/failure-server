import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "src/jwt/jwt.service";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModule: typeof User, private readonly JwtService: JwtService) {}

  async getAll(): Promise<Array<User> | Error> {
    const allUsers = this.userModule.findAll();
    if (allUsers) {
      throw new Error("not users");
    }
    return allUsers;
  }

  async getByEmail(userDto: UserDto): Promise<User | string> {
    const getOptions = {
      where: { value: userDto.email },
    };
    const user = this.userModule.findOne(getOptions);
    if (!user) throw new Error("not found user");
    return user;
  }

  async registred(userDto: UserDto): Promise<UserDto | string> {
    try {
      
      const { password, email, name, username } = userDto;
      const dto = new UserDto();
      const hasedPassword = await dto.hashPassword(password);
      const tokens = this.JwtService.generateTokens({password, email, name, username})
      const dataUser = {
        email,
        name,
        username,
        password: String(hasedPassword),
        ...tokens
      };
      const rows = this.userModule.create({value: dataUser})
      return rows;
    } catch (error) {
      return error.message
    }
  }
  async login(userDto: UserDto): Promise<UserDto | string> {
    const userModelOptions = {
      where: { value: userDto.email },
    };
    const dataUser = await this.userModule.findOne(userModelOptions);
    if (!dataUser) {
      throw new Error("user not found 404");
    }
    const tokens = this.JwtService.generateTokens(dataUser)

    return {...dataUser, ...tokens};
  }
  async update(userDto: UserDto): Promise<Array<number> | Error> {
    const updOptions = {
      where: {
        value: userDto.email,
      },
    };
    const updUser = await this.userModule.update({ value: userDto }, updOptions);
    if (!updUser) {
      throw new Error("error upd User data");
    }
    return updUser;
  }
  async remove(userDto: UserDto): Promise<number> {
    const searchOptions = {
      where: {
        value: userDto.email,
      },
    };
    const status = this.userModule.destroy(searchOptions);
    return status;
  }
}
