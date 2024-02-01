import "reflect-metadata";

import dotenv from 'dotenv'; 
dotenv.config();

import express, { Express, Request, Response } from 'express';
const app: Express = express();

import toBoolean from "to-boolean";

import { IUser, ValidationResult } from './sharedTypes';
import { AppDataSource } from "./database/dbConfig";
import { bundleErrorsFromArray } from './utils/formattingUtils';
import { getUserByEmailDatabase, getAllUsers } from './utils/queryUtils'
import { UserValidation } from './user/UserValidation';
import { UserActions } from './user/UserActions';
import { UserData } from "./user/UserData";

// Middleware
app.use(express.json());

const userData = new UserData;
const userActions = new UserActions(userData);
const userValidation = new UserValidation;

const useDatabase: boolean = toBoolean(process.env.USE_DATABASE || 'true');

app.get('/users', async (req: Request, res: Response) => {
    if (useDatabase) {
        res.json(await getAllUsers());
    } else {
        res.json(userData.users)
    }
})

app.post('/users/register', async (req: Request, res: Response) => {
    const userInputData: IUser = {
        email: req.body.email,
        password: req.body.password
    }

    const validationResults: ValidationResult = userValidation.registerValidation(userInputData);
    const validationErrors: string | undefined = bundleErrorsFromArray(validationResults.errors)
    const thereIsError: boolean = !validationResults.success;
    if (thereIsError) {
        return res.status(400).send(validationErrors);
    }

    let userExists: unknown;
    if (useDatabase) {
        userExists = await getUserByEmailDatabase(userInputData.email);
    } else {
        userExists = userData.getUserByEmailLocal(userInputData.email);
    }
    if (userExists) {
        return res.status(409).send("Email already in use.");
    }

    try {
        userActions.register({
            email: userInputData.email,
            password: userInputData.password,
        });
        return res.status(201).send("User created successfully.");
    } catch {
        res.status(500).send();
    }
})

app.post('/users/login', async (req: Request, res: Response) => {
    const userInputData: IUser = {
        email: req.body.email,
        password: req.body.password
    }

    const validationResults: ValidationResult = userValidation.loginValidation(userInputData);
    const validationErrors: string | undefined = bundleErrorsFromArray(validationResults.errors)
    const thereIsError: boolean = !validationResults.success;
    if (thereIsError) {
        return res.status(400).send(validationErrors);
    }

    let userExists: unknown;
    if (useDatabase) {
        userExists = await getUserByEmailDatabase(userInputData.email);
    } else {
        userExists = userData.getUserByEmailLocal(userInputData.email);
    }
    if (!userExists) {
        return res.status(404).send("User does not exist.");
    }

    try {
        if (await userActions.login(userExists as IUser, userInputData.password)) {
            return res.status(200).send("Logged in successfully.");
        }
        return res.status(401).send("Incorrect password.");
    } catch {
        res.status(500).send()
    }
})

await AppDataSource.initialize()
    .then(() => {
        console.log("Connected to mySQL server.");
        app.listen(process.env.PORT, () => {
            console.log(`Server running at ${process.env.HOST}: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("Unable to connect to mySQL server.");
        throw error;
    });