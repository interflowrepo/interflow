import {
  DataType,
  Column,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table
export class account extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  address!: string;

  @Column(DataType.STRING)
  type!: string;

  @AllowNull(true)
  @Column(DataType.DATE)
  @CreatedAt
  created_at!: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  @UpdatedAt
  updated_at!: Date;

  @AllowNull(true)
  @Column(DataType.DATE)
  deleted_at!: Date;

  @Column(DataType.STRING)
  interflow_user_id!: string;
}
