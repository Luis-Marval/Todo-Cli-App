import { readFileSync,readFile, writeFileSync } from "../deps.js"

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
    try{
      const data = JSON.parse(readFileSync("task.json",{encoding: "utf-8"}))
      if (data["task"].length == 0){
      throw ("No hay ninguna tarea asignada")
      }
      return data["task"]
    }catch(err){
      console.log(err)
      return false
    }
  }

  static complete(input){
    try {
      if (isNaN(parseInt(input)))throw ("Error:El digito ingresado no es un numero,")
      input = parseInt(input)-1
      const data = JSON.parse(readFileSync("task.json",{encoding: "utf-8"}));
      data["task"][input]["status"] = "complete";
      writeFileSync("task.json",JSON.stringify(data));
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  static delete(input){
    try {
      if (isNaN(parseInt(input)))throw ("Error:El digito ingresado no es un numero,")
      const data = JSON.parse(readFileSync("task.json",{encoding: "utf-8"}));
      data["task"].splice(parseInt(input)-1,1);
      writeFileSync("task.json",JSON.stringify(data));
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }
}