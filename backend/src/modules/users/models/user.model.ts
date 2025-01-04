import { Table,Model, Column, DataType } from "sequelize-typescript";

@Table({tableName: 'users', timestamps: true})
export class User extends Model {
    @Column({type: DataType.STRING,allowNull:false })
    fullname: string;

    @Column({type: DataType.STRING,allowNull:false })
    email: string;

    @Column({type: DataType.BIGINT,allowNull:false })
    phone_number: string;

    @Column({type: DataType.STRING,allowNull:true })
    image ?: string;
    
    @Column({type: DataType.STRING,allowNull:false })
    password: string;
}