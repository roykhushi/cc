//stdout 
//open file → get readable stream then connect readable stream → process.stdout
// not using fs.readfilesync => loads entire file in mem at once and unix cmds dont work like that
//using streams -> files read line by line and in chunks 

import * as fs from "fs";

const file = "file.txt";

//creating a readable stream
const rs = fs.createReadStream(file,{encoding:"utf-8"});

rs.pipe(process.stdout);//chunks of file data sent directly to terminal

rs.on("error",(e)=>{
    console.error(`error occ ${e.message}`);
    process.exit(1);
});