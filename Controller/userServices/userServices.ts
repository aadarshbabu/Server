

import { Request, Response } from "express";

export default class UserService {

   public getUser(req:Request, res:Response){
        res.send("Test");
    }




}


