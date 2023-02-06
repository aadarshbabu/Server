import { NextFunction, Request, Response } from "express";

class Auth {
    private userid:number | undefined
    constructor(){
        this.userid;
    }

    public VerifyUser(req:Request, res:Response,next:NextFunction):any {
        const userid = req.params;
        if(userid.id)
            next();
        else{
            throw new Error("Invalid User id");
        }
    } 


}

const auth = new Auth();

export default auth;