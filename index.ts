import { Express, Request, Response } from 'express';
const express = require('express');
const app: Express = express();
const bcrypt = require('bcrypt');
require('dotenv').config();

app.use(express.json());

const PASSWORD_HASH_SALT = 10
const users: { email: string, password: string }[] = []

app.get('/users', (req: Request, res: Response) => {
    res.json(users);
}) //request users data for testing

function findUserByEmail(email: string) {
    const user = users.find(user => user.email == email);
    return user;
}

function invalidEmail(email: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i; 
    if (!expression.test(email)) return true;
    return false;
}

function registerErrorHandling(email: string, password: string) {
    let error: string = "";
    if (email == "" || password == "") {
        error = "Empty field.";
        return error;
    }
    if (invalidEmail(email)) {
        error = "Invalid email.";
        return error;
    }
    if (findUserByEmail(email) != null) {
        error = "Email already in use.";
        return error;
    }
    return error;
}

async function registerUser(email: string, password: string) {
    try {
        users.push({
            email: email,
            password: await bcrypt.hash(password, PASSWORD_HASH_SALT)
        });
    } catch(err) {
        console.log(err);
    }
}

app.post('/users', async (req: Request, res: Response) => {
    const error = registerErrorHandling(req.body.email, req.body.password);
    if (error != "") return res.status(400).send(error);
    try {
        await registerUser(req.body.email, req.body.password);
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

function loginErrorHandling(email: string, password: string) {
    let error: string = "";
    if (email == "" || password == "") {
        error = "Empty field.";
        return error;
    }
    if (findUserByEmail(email) == null) {
        error = "User does not exist.";
        return error;
    }
    return error;
}

app.post('/users/login', async (req: Request, res: Response) => {
    const error = loginErrorHandling(req.body.email, req.body.password);
    if (error != "") return res.status(400).send(error);
    try {
        if (await bcrypt.compare(req.body.password, findUserByEmail(req.body.email)?.password)) {
            res.send("Logged in successfully.");
        } else {
            res.status(401).send("Incorrect password.");
        }
    } catch (err) {
        res.status(500).send()
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.HOST}: ${process.env.PORT}`);
})