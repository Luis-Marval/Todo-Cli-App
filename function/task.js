import { readFileSync,readFile, writeFileSync } from "../deps.js"
// creo la clase task que se utilizada para manejar el archivo json
export class task{
  fileName = "task.json" // se declara el atributo fileName que almacena el nombre del archivo
  
  // se crea un atributo instance que es estatico y privado donde se almacenara la instacia de la clase
  static #instance; 

  // Metodo estatico get para crear una instacia de la clase, en caso de ya existir se retornada esta misma
  static get instance(){
    if(!task.#instance){
      task.#instance = new task()
    }
    return task.#instance
  }
  // Metodo Utilizado para crear nuevas tareas
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
    // Si no existe el archivo .json lo crea y añade la tarea
    if(exist === "default"){
      const data = ({
        "task":[template]})
      writeFileSync(this.fileName,JSON.stringify(data)) 
    }
    // Si ya existe solo añade la tarea
    else{
      exist["task"].push(template)
      writeFileSync(this.fileName,JSON.stringify(exist)) 
    } 
    // retorna el id de la nueva tarea
    return id
  }
  // metodo para leer el archivo .json, en caso de no existir retorna dafault
  exists(){
    try{
      const data = JSON.parse(readFileSync(this.fileName,{encoding: "utf-8"}))
      if(data["task"].length == 0){
        throw new Error("faw")
      }
      return data
    }catch(err){
      return "default"
    }
  }
  // metodo que retorna la informacion del archivo .json 
  list(){
    const data = this.exists();
    if(data === "default" ||data.length == 0 ){
      throw new Error("Error:No hay ninguna tarea asignada")
    }
    return data
  }

  // metodo utilizado para actualizar la descripcion de una tarea
  update(input,description){
    const data = this.exists();
    if (isNaN(parseInt(input)))throw new Error("Error:El digito ingresado no es un numero")
    if(data === "default") throw new Error("Error: No hay ninguna tarea registrada")
    // cambia la antrigua descripcion por la nueva
    data["task"][input-1]["description"] = description;
    // Actualiza el atributo updatedAt con la fecha en que se actualizo la tarea 
    data["task"][input-1]["updatedAt"] = new Date();
    // edita la info del archivo.json
    writeFileSync(this.fileName,JSON.stringify(data));
    // retorna true
    return true;
  }

  // metodo utilizado para cambia el status de la tarea selecionada
  complete(input,status){
    const data = this.exists();
    if (isNaN(parseInt(input)))throw ("Error:El digito ingresado no es un numero,")
    if(data === "default") throw ("Error: No hay ninguna tarea registrada")
    
    // cambia el valor de estatus a in-progress si es 1 o a done en caso contrario
    status =  parseInt(status) === 1 ? "in-progress" : "done"
    
    // rescribe el status de la tarea seleccionada

    data["task"][input-1]["status"] = status;
    writeFileSync("task.json",JSON.stringify(data));
    return true;
  }

  // Metodo utilizado para Eleminar una tarea selecioanda

  delete(input){
    const data = this.exists();

    if (isNaN(parseInt(input)))throw ("El digito ingresado no es un numero")
    
    if(data === "default") throw ("No hay ninguna tarea registrada")

    if(!data["task"][parseInt(input)-1]) throw ("La tarea seleccionara no existe")
      
    // remueve la tarea del archivo.json
    data["task"].splice(parseInt(input)-1,1);
    writeFileSync("task.json",JSON.stringify(data));
    // retorna un true
    return true
  }
}
