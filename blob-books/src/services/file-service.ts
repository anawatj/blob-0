import {path as rootPath}  from 'app-root-path';
import { v4 } from 'uuid';
import fs  from 'fs';
export const uploadFile=(file:Express.Multer.File)=>{
    const fileName = v4();
    const fileType=file!.mimetype.split("/")[1];
    const fullName = fileName+"."+fileType;
    const dir = rootPath+"/uploads";
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(dir+"/"+fullName,file!.buffer);
    const image = "/api/books/uploads/"+fullName;
    return image;
}