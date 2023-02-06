
import Controller from "../../decorators/RouteDecorotor/controller.docorator"
import { Get } from "../../decorators/RouteDecorotor/handler.controller";
import UserService from "../userServices/userServices"
import { Request, Response } from "express";
import auth from "../../Middleware/auth/User.auth";

@Controller("/User")
class User {

    private user;
    constructor(){
      this.user = new UserService(); // User Service Object.
    }

    @Get("/userId/:id", [auth.VerifyUser]) // Handler.
    getUser(req:Request, res:Response){
      return this.user.getUser(req, res);
    }
    

}


export default User