import { Model, Column, Table, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "src/user/user.entity";

@Table
export class Post extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column
  title: string;
  @Column
  text: string;
  @Column({
    type: DataType.BLOB
  })
  image: Blob;
  @ForeignKey(() => User)
  @Column
  userEmail: string
}
