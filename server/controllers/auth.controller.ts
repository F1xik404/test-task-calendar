import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {User} from "../models/User.model";

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    console.log(`Login ${email} ${password}`);
    const user = await User.findOne({where: {email}});
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            const token = jwt.sign({id: user.id}, String(process.env.JWT_SECRET), {expiresIn: "24h"});
            res.status(200).send({token});
        } else{
            res.status(400).send("Invalid password");
        }
    } else {
        res.status(400).send("User not found");
    }
}

export const register = async (req: Request, res: Response) => {
    console.log(`Register ${req.body.name} ${req.body.email} ${req.body.password}`);
    const {name, email, password} = req.body;
    if(await User.findOne({where: {email}})){
        res.status(400).send("User already exists");
    } else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({id: user.id}, String(process.env.JWT_SECRET), {expiresIn: "24h"});
        res.status(201).send({token});
    }
}