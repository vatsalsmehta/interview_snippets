import express, { Application, Request, Response } from "express";
import { handleSignIn } from "../controller/signin";
import { BadRequestError, errorResponse } from "../utils/error";
import { handleSignUp } from "../controller/signup";
const app: Application = express();


// handler for sign in routed from index file
app.post("/signin", async(req:Request, res:Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError('Request Body is missing');
        }

        if (!req.body.username || !req.body.password) {
            throw new BadRequestError('both id and password are required');
        }

        const signInRepsonse = await handleSignIn(req.body);
        
        res.status(signInRepsonse.status).send({
            "body": signInRepsonse.userDetails ?
            signInRepsonse.userDetails :
            signInRepsonse.errormessage
    });

    } catch (error) {
        return errorResponse(error as Error, res);
    }

})

app.post("/signup", async(req:Request, res:Response) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            throw new BadRequestError('Request Body is missing');
        }

        if (!req.body.username || !req.body.password || !req.body.email) {
            throw new BadRequestError('username , password and email are required');
        }

        const signUpResponse = await handleSignUp(req.body.email, req.body.password, req.body.username)

        
        res.status(signUpResponse.status).send({
            "body": signUpResponse.message 
    });

    } catch (error) {
        return errorResponse(error as Error, res);
    }

})

module.exports = app;