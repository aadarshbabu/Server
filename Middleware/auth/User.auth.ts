import { NextFunction, Request, Response } from "express";

class Auth {
    private userid:number | undefined
    constructor(){
        this.userid=0;
    }

    public VerifyUser(req:Request, res:Response,next:NextFunction):Boolean {
        const userid = req.params;
        console.log(userid)
        next();
       return true;
    } 


}

const auth = new Auth();

export default auth;