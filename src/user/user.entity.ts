import { Column, Model, Table } from "sequelize-typescript";
@Table
export class User extends Model {
  @Column
  name: string;
  @Column
  username: string;
  @Column
  email: string;
  @Column
  password: string;
  static email: any;

  @Column
  accessToken: string
  @Column 
  refreshToken: string
}
