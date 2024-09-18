import { task } from "../function/task.js" //se llama a la clase task

const argOne = process.argv[2],
argTwo = process.argv[3],
argTree = process.argv[4];
// se almacenan los argumentos en constantes
const tarea = task.instance
// se almacena la instacia de la clase task en la constate tarea
let result;
// se crea una funcion en la cual se le pasara un argumento
const inputOption = (arg) =>{
  try {
    // se utilizada el argumento para seleccionar la tarea a utilizar con un switch
    switch (arg) {
      case "add":
        result = tarea.Add(argTwo)
        if(result) console.log(`\nTarea Añadira Correctamente ( ID : ${result} )`)
      break;
      case "update":
        result = tarea.update(argTwo,argTree)
        if(result) console.log(`\nTarea Actualizada Correctamente ( ID : ${argTwo} )`)
        else throw new Error(`\nLa tarea seleccionara no existe`)
      break;
      case "delete":
        result = tarea.delete(argTwo)
        if(result === true) console.log(`\nTarea Eliminada Correctamente ( ID : ${argTwo} )`)
        else throw new Error(result)
      break;
      case "list":
        result= tarea.list()
        result = result["task"]
        console.log(argTwo)
        if(argTwo != undefined && argTwo != "todo" && argTwo != "in-progress" && argTwo != "done") throw new Error("Coloque una opcion valida en la lista")
        const arg = argTwo === undefined ?"":argTwo
        console.log(`\nLista de tareas ${arg}\n`)
        for(const res of result){
          if (typeof argTwo != "undefined" && res["status"] != argTwo){ continue}
          const create = new Date(res["createdAt"])
          console.log(`Id:${res["id"]}\n`,`Descricion:${res["description"]}\n`,`Estado:${res["status"]}\n`,`Fecha de creacion:${create.getHours()}:${create.getMinutes()}:${create.getSeconds() == 0 ? "00":create.getSeconds()} ${create.getDate()}/${(create.getMonth()) +1}/${create.getFullYear()}`)
          if(res["updatedAt"] != null) {
            const update = new Date(res["updatedAt"])
            console.log(` Ultima Actualizacion:${update.getHours()}:${update.getMinutes()}:${update.getSeconds() == 0 ? "00":update.getSeconds()} ${update.getDate()}/${(update.getMonth()) +1}/${update.getFullYear()}\n`)
          }
          else console.log(`\n`)
        };
      break;
      case "mark":
        if(argTwo == undefined) throw new Error("Para cambiar el estado de una tarea debe colocar el Id de dicha tarea")
        if(argTree == undefined) throw new Error("Para cambiar el estado de una tarea debe colocar el estado de dicha tarea")
        if(argTree != 0 && argTree != 1) throw new Error("El valor del estado ingresado es incorrrecto")
        tarea.complete(argTwo,argTree)
        console.log(`El estado de la tarea cambio con exito`)
      break
      // en caso de no coincidir con ninguna realiza la siguiente operacion
      default:
        throw new Error("Error:Opcion no valida")
    }
  } catch (err) {
    console.log(err.message) // muestra el error en consola
    process.exit(1)//salir del cli, con resultado erroneo
  }
}

inputOption(argOne) // se llama a la funcion con el primer argumento que sera la funcion a realizar
process.exit(0)// salir del cli, con resultado exitoso