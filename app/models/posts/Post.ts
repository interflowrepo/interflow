import { User } from "@models/users/User";
import { DataType, Column, Default, Model, PrimaryKey, Table, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";

@Table
export class Post extends Model {

  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column(DataType.UUID)
  postId!: string;

  @Column(DataType.STRING)
  nftId!: string;

  @Column(DataType.STRING)
  nftImageLink!: string;

  @Column(DataType.STRING)
  nftCollectionName!: string;

  @Column(DataType.STRING)
  nftType!: string;

  @Column(DataType.STRING)
  postText!: string;

  @Column(DataType.STRING)
  timestamp!: string;

  @Column(DataType.BOOLEAN)
  isOwner!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}
