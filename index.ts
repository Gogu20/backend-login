import { Express, Request, Response } from 'express';
const express = require('express');
const app: Express = express();
const bcrypt = require('bcrypt');
require('dotenv').config();

app.use(express.json());

const users = [];

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
}) //request users data for testing

app.post('/users', async (req: Request, res: Response) => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
    if (!expression.test(req.body.email)) {
        return res.status(400).send("Invalid email.");
    }
    const dupeEmail = users.find(dupeEmail => dupeEmail.email == req.body.email);
    if(dupeEmail != null) {
        return res.status(400).send("Email already in use.")
    }
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {email: req.body.email, password: hashedPassword};
        users.push(user);
        res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const user = users.find(user => user.email == req.body.email)
    if (user == null) {
        return res.status(404).send("User does not exist.");
    }
    try {
        if (bcrypt.compare(req.body.password, user.password)) {
            res.send("Logged in successfully.");
        } else {
            res.status(401).send("Incorrect password.");
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.HOST}: ${process.env.PORT}`);
})