import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({tableName: "users",timestamps: false})
export class User extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;
}