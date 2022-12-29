import MetadataKeys from "../../utils/metadata.key"

const enum Methods {
    GET='get',
    POST='post',
    PUT='put',
    DELETE='delete'
}

export interface IRouter{
    method:Methods,
    middlewares:any[],
    handlerPath:string,
    handlerName:string | symbol
}

function decoratorFactory(method:Methods){
    return function (path:string, middlewares?:any):MethodDecorator{
        return function(target,propertyKey){
            const controllerClass = target.constructor
            const routers:IRouter[] = Reflect.hasMetadata(MetadataKeys.ROUTER, controllerClass) ?
            Reflect.getMetadata(MetadataKeys.ROUTER, controllerClass): [];

            routers.push({
                method,
                middlewares,
                handlerName:propertyKey,
                handlerPath:path
            })
            Reflect.defineMetadata(MetadataKeys.ROUTER,routers, controllerClass);
        }
    }
}


export const Get = decoratorFactory(Methods.GET);
export const Put = decoratorFactory(Methods.PUT);
export const Post = decoratorFactory(Methods.POST);
export const Delete = decoratorFactory(Methods.DELETE);
