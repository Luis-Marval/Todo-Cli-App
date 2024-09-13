import { readFileSync,readFile, writeFileSync } from "../deps.js"

export class task{
  fileName = "task.json"
  constructor(description){
    this.id = 1;
    this.name = description;
    this.status = "todo";
    this.createDate = new Date();
    this.updateDate = "null";
    this.Add()
  }
  Add(){
    const exist = this.exists()
    this.id = (exist === "default") ? 1 : parseInt(exist["task"].length)+1
    const template = {
      "id":parseInt(this.id),
      "description":this.name,
      "status":this.status,
      "createdAt":this.createDate,
      "updatedAt":this.updateDate
    }
    if(exist === "default"){
      const data = ({
        "task":[template]})
      writeFileSync(this.fileName,JSON.stringify(data)) 
    }else{
      exist["task"].push(template)
      writeFileSync(this.fileName,JSON.stringify(exist)) 
    } 
  }
  exists(){
    try{
      const data = JSON.parse(readFileSync(this.fileName,{encoding: "utf-8"}))
      return data
    }catch(err){
      return "default"
    }
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

new task("sair")