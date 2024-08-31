import { write } from "node:fs"
import { readFile,writeFile } from "node:fs/promises"

export class task{
  constructor(description){
    this.name = description,
    this.status = "incomplete",
    this.Add()
  }
  async Add(){
    let data = JSON.parse(await readFile("task.json",{encoding: "utf-8"}))
    data["task"].push({"name":`${this.name}`,"status":`${this.status}`})
    writeFile("task.json",JSON.stringify(data)) 
  }
}