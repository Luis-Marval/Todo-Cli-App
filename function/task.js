import { readFileSync,readFile,writeFile } from "../deps.js"

export class task{
  constructor(description){
    this.name = description,
    this.status = "incomplete",
    this.Add()
  }
  async Add(){
    const data = JSON.parse(await readFile("task.json",{encoding: "utf-8"}))
    data["task"].push({"name":`${this.name}`,"status":`${this.status}`})
    writeFile("task.json",JSON.stringify(data)) 
  }
  static list(){
    const data = JSON.parse(readFileSync("task.json",{encoding: "utf-8"}))
    
    for (const key in data["task"]) {
      const mesage= ` ${parseInt(key)+1}. ${data["task"][key]["name"]} -> ${data["task"][key]["status"]}`;
      const status = data["task"][key]["status"] === "complete" ? "✔" : ""
      console.log(`${mesage}${status}`)
    }
  }
}