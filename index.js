import { createInterface } from "node:readline"
import chalk from "chalk"
import { task } from "./function/task.js"

/* const task = [] */

const rl = createInterface({
  input:process.stdin,
  output:process.stdout
})

const displayMenu = () => {
  console.log(
    chalk.cyan.bold("    ** ToDo Cli **\n"),
    "1. Agregar Tarea\n",
    "2. Listar Tarea\n",
    "3. Completar Tarea\n",
    "4. Eliminar Tarea\n",
    "5. Salir"
  )
}

function choseOption(){
  rl.question(" > ",(value) =>{
      let valueInt = parseInt(value);
      switch(valueInt){
        case(5): 
          rl.write(null,{ctrl:true,name:"d"})
          rl.close
        break
        case(1):
          rl.question("\nNombre de la tarea: \n>",(nombre) =>{
            new task(nombre)
            rl.write(null,{ctrl:true,name:"c"})
            displayMenu()
            choseOption()
          })
        break
        default:
          console.log(chalk.red.bold("opcion invalida,intenta nuevamente\n"))
          displayMenu()
          choseOption()
      }
  })
}

displayMenu()
choseOption()

