// Moongooes Connection. 
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import { env } from "process";
import { logger } from "../Logger/CreateLogger";

class Connection {

    private ConnectionUri: string
    private db:any
    constructor(connectionUri:string){  
        this.ConnectionUri = connectionUri;
    }

    public MoongooesConnection(connectionUri?:string){
        mongoose.set("strictQuery", false);
        try {     
            if(connectionUri)
                return mongoose.connect(connectionUri);
            return mongoose.connect(this.ConnectionUri);
        } catch (error) {
            logger.error(error);
        }
    }

    public async connection(dbName:string, connectionString?:string){
        if(connectionString){
            try {
                const client = new MongoClient(connectionString);
                this.db = client.db(dbName)
            } catch (error) {
                logger.error(error);
                
            }
        }
        
    }

    public getDb(){
        // GetDB is ruturn the connection Object.
        return this.db;
    }

}
export default function conn(connURI?:string){
    // Function Return the Connection Class Object Or error. If ConnectionURI is present in the env File. In this object You can call the method to connect the database.
    if(env.CONECTIONURI){
       let URI:string = env.CONECTIONURI;
        let con = new Connection(URI);
        return con;
    }
    else if(connURI){
        let con = new Connection(connURI);
        return con; 
    }
    throw new Error("Provide a connection URI");
}

    


