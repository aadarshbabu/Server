
import {ErrorRequestHandler, Request, Response, NextFunction} from 'express';

type customErrorMsg ={
    message:string,
    status:number
}
// Custom Error Class which extend the Error Class. -> when custom error comes.
// then send the super class with message.
class error extends Error{
    public status:number;
    constructor(msg:string, status:number){
        super(msg);
        this.status = status;
    }
}

// Custom Error Handler Function.
export function customError({message, status}:customErrorMsg) {
    return new error(message,status) // Retrun the object the custom error class.
}


// Error Hnadler. (It's use for Express which send the responce to the error.)
export function err(err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction){
    if(err instanceof error){
        res.status(err.status).json({message:err.message, status:err.status}) // custom error
    }
    res.status(500).json({msg:'internal Server Error', status:500}) // Default Server Error. 
}