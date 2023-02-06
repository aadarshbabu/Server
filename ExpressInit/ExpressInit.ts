
import express, { Express, Handler } from "express"
import { logger, stream } from "../Logger/CreateLogger";
import { Server } from "http";
import morgon from 'morgan';
import MetadataKeys from "../utils/metadata.key";
import { IRouter } from "../decorators/RouteDecorotor/handler.controller";
import Controller from "../decorators/RouteDecorotor/controller.docorator";
import { err } from "../Errors/Error";
import { ErrorRequestHandler } from "express-serve-static-core";
class ExpressApp {


    private app: Express;
    private port: Number | String;
    constructor(port: number | String, middleware: any[], controllers: any[]) {
        this.app = express();
        this.port = port;
        this.Middleware(middleware);
        this.setupLogger();
        this.setupController(controllers);
        this.setupErrorHandler(err);
    }
    
    private setupErrorHandler(err:ErrorRequestHandler) {
        this.app.use(err);
    }

    private setupController (controllers:any[]){
        const info: Array<{api:string; handler:string} > = [];
        controllers.forEach((controller)=>{

            const controllerInstance : {[handlerName:string]:Handler} = new controller();
            let basePath :string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controller);
            
            const routers:IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTER, controller);
            const expresRouter = express.Router();
            routers.forEach(({method, handlerName, handlerPath, middlewares })=>{
                if(middlewares){
                    expresRouter[method](
                        handlerPath,
                        ...middlewares,
                        controllerInstance[String(handlerName)].bind(controllerInstance)
                        )
                       
                }else{
                    expresRouter[method](
                        handlerPath, 
                        controllerInstance[String(handlerName)].bind(controllerInstance)
                    )
                }
                info.push({api:`${method.toLocaleLowerCase()} ${basePath + handlerPath}`,handler:`${Controller.name} ${String(handlerName)}`})
            
                
            });
            this.app.use(basePath, expresRouter);
            console.table(info);
        }) 


    }
    
    // This middleware is setup for app. So called express Middleware.
    private Middleware(middlewares: any[]) {
        middlewares.forEach(Middleware => {
            this.app.use(Middleware);
        });
    }
    // Satup the Logger middleware. This middleware handle the production as well as        Devlopemnt Env.
    private setupLogger() {
        if (process.env.NODE_ENV !== "production") {
            this.app.use(morgon('combined', {
                skip: function (req, res) {
                    return res.statusCode < 400
                },
                stream: stream // Stream is an object which call the write function,
            }))

        }
    }

    // Start initial Function. which return the SIGMA. 
    start(): Server {
        return this.app.listen(this.port, () => {
            logger.info(`App is start on the port ${this.port}`)
        });

    }
}

export default ExpressApp