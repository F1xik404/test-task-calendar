import { Request, Response } from 'express';
import {Event} from '../models/Event.model';
import jwt, {JwtPayload} from "jsonwebtoken";


export const newEvent = async (req: Request, res: Response) => {
    const {name, description, date, time, priority} = req.body;
    console.log("New event");
    try {
        await Event.create({name, description, date: new Date(date), time, priority, userId: getUserId(req)});
        res.status(201).send({status: 'success'});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

export const getEvents = async (req: Request, res: Response) => {
    const events = await Event.findAll({where: {userId: getUserId(req)}});
    res.status(200).send(events);
}

export const deleteEvent = async (req: Request, res: Response) => {
    console.log("Delete event");
    const event = await Event.findByPk(req.params.id);
    event?.destroy();
    res.status(200).send({status: 'success'});
}

export const updateEvent = async (req: Request, res: Response) => {
    const event = await Event.findByPk(req.params.id);
    event?.update(req.body);
    event?.save();
    res.status(200).send({status: 'success'});
}

//Трохи костильно(або не дуже трохи) але TypeScript мене жорстоко ненавидів
function getUserId(req: Request) {
    const token = req.header("Authorization")?.split(" ")[0];
    if (token) {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as JwtPayload;
        return decoded.id;
    } else {
        return null;
    }
}