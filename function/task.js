import { readFileSync,readFile, writeFileSync } from "../deps.js"

export class task{
  fileName = "task.json"
  static #instance;
  static get instance(){
    if(!task.#instance){
      task.#instance = new task()
    }
    return task.#instance
  }
  Add(description){
    const exist = this.exists()
    const id = (exist === "default") ? 1 : parseInt(exist["task"].length)+1
    const template = {
      "id":parseInt(id),
      "description":description,
      "status":"todo",
      "createdAt":new Date(),
      "updatedAt":null
    }
    if(exist === "default"){
      const data = ({
        "task":[template]})
      writeFileSync(this.fileName,JSON.stringify(data)) 
    }else{
      exist["task"].push(template)
      writeFileSync(this.fileName,JSON.stringify(exist)) 
    } 
    return [true,id]
  }
  exists(){
    try{
      const data = JSON.parse(readFileSync(this.fileName,{encoding: "utf-8"}))
      if(data["task"].length == 0){
        throw ("faw")
      }
      return data
    }catch(err){
      return "default"
    }
  }

  list(){
    try{
      const data = this.exists();
      if(data["task"].length == 0 || data === "default"){
        throw ("Error:No hay ninguna tarea asignada")
      }
      return [data["task"],false]
    }catch(err){
      return [err,true]
    }
  }

  update(input,description){
    try {
      const data = this.exists();
      if (isNaN(parseInt(input)))throw ("Error:El digito ingresado no es un numero,")
      if(data === "default") throw ("Error: No hay ninguna tarea registrada")
      
      data["task"][input-1]["description"] = description;
      data["task"][input-1]["updatedAt"] = new Date();

      writeFileSync(this.fileName,JSON.stringify(data));

      return true;
    } catch (err) {
      return false;
    }
  }

  complete(input,status){
    try {
      const data = this.exists();
      if (isNaN(parseInt(input)))throw ("Error:El digito ingresado no es un numero,")
      if(data === "default") throw ("Error: No hay ninguna tarea registrada")
      
      const stat =  status === 1 ? "in-progress" : "done"

      data["task"][input-1]["status"] = stat;
      writeFileSync("task.json",JSON.stringify(data));
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  delete(input){
    try {
      const data = this.exists();
      if (isNaN(parseInt(input)))throw ("El digito ingresado no es un numero")
      if(data === "default") throw ("No hay ninguna tarea registrada")
      if(!data["task"][parseInt(input)-1]) throw ("La tarea seleccionara no existe")
      
      data["task"].splice(parseInt(input)-1,1);
      writeFileSync("task.json",JSON.stringify(data));
      return true
    }catch(err){
      console.log(err)
      return err
    }
  }
}
