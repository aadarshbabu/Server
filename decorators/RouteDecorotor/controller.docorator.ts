

// const Controller = (basePath:string):ClassDecorator =>(target)=>{

import MetadataKeys from "../../utils/metadata.key"

// }

export default function Controller(basePath:string):ClassDecorator{
    return (target)=>{
        Reflect.defineMetadata(MetadataKeys.BASE_PATH,basePath,target)
    }
}