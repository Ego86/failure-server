
export class UserDto {
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly accessToken?: string 
  readonly refreshToken?: string 

  async hashPassword?(password: string): Promise<number> {
    const salt = 10;
    // const passwordHashed: string = await bcrypt.hash(password, salt);

    return salt;
  }
}
