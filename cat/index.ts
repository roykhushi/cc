//stdout
//open file → get readable stream then connect readable stream → process.stdout
// not using fs.readfilesync => loads entire file in mem at once and unix cmds dont work like that
//using streams -> files read line by line and in chunks

import * as fs from "fs";
import * as readline from "readline";

const args = process.argv.slice(2);
const lineFlag = args.includes("-n");
const files = args.filter((arg) => arg !== "-n");

let counter = 1;

if (files.length == 0) {
  //stdin
  process.stdin.pipe(process.stdout);
}

files.forEach((file) => {
  //creating a readable stream
  const rs = fs.createReadStream(file, { encoding: "utf-8" });

  if (lineFlag) {
    const rl = readline.createInterface({
      input: rs,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      process.stdout.write(`${counter} ${line}\n`);
      counter++;
    });
  }
  else{
    rs.pipe(process.stdout); //chunks of file data sent directly to terminal
  }

  rs.on("error", (e) => {
    console.error(`error occ ${e.message}`);
  });
});
