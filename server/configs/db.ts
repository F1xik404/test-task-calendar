import {Sequelize} from 'sequelize-typescript';
import {User} from "../models/User.model";
import {Event} from "../models/Event.model";

const db = new Sequelize({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    models: [User, Event],
    logging: false,
});

export default db;
