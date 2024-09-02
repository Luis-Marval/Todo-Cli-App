import { task } from "./function/task.js"
import { createInterface,stdin,stdout} from "./deps.js"
import chalk from "chalk";
/* const task = [] */

const rl = createInterface({
  input:stdin,
  output:stdout
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
      const valueInt = parseInt(value);
      switch(valueInt){
        case(5): 
          rl.write(null,{ctrl:true,name:"d"})
          rl.close
        break
        case(1):
          rl.question(("\nNombre de la tarea: \n>"),(nombre) =>{
            new task(nombre)
            console.clear()
            displayMenu()
            choseOption()
          })
        break
        case(2):
          console.clear()
          console.log(chalk.cyan.bold("    ** Lista de tareas **\n"))
          console.log(chalk.cyan.bold("Nombre de las tareas  ->  estado de la tarea\n"))
          task.list()
          console.info('\npresione "Enter" para continuar')
          rl.on('line', () => {
            reCall()
          }); 
        break
        default:
          console.log(chalk.red.bold('opcion invalida,pulse "enter" para volver a intentarlo\n'))
          rl.on('line', () => {
            reCall()
          }); 
      }
  })
}
function reCall(){
  console.clear();
  displayMenu();
  choseOption();
}

displayMenu()
choseOption()

