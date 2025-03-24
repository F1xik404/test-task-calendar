import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from './User.model';

@Table({tableName: 'events', timestamps: false})
export class Event extends Model{
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    time: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    priority: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}