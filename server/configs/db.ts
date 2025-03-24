import {Sequelize} from 'sequelize-typescript';
import {User} from "../models/User.model";
import {Event} from "../models/Event.model";

const db = new Sequelize({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: "postgres",
    password: "adrenalin100",
    dialect: 'postgres',
    models: [User, Event],
    logging: false,
});

export default db;