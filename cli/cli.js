import { task } from "../function/task.js"
import { rl } from "../deps.js"
import chalk from "chalk";
/* const task = [] */

const displayMenu = () => {
  console.log(
    ("    ** ToDo Cli **\n"),
    "1. Agregar Tarea\n",
    "2. Listar Tareas\n",
    "3. Actualizar Tarea\n",
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
          console.log(("    ** Lista de tareas **\n"))
          console.log(("Nombre de las tareas  ->  estado de la tarea\n"))
          const tarea = task.list()
          for (const key in tarea) {
            const mesage= ` ${parseInt(key)+1}. ${tarea[key]["name"]} -> `;
            const status = tarea[key]["status"] === "complete" ? "✔" : "X"
            console.log(`${mesage}${status}`)
          }
          console.info('\npresione "Enter" para continuar')
          rl.on('line', () => {
            reCall()
          }); 
        break
        case(3):
          console.clear()
          console.log(("    ** Seleccione la tarea realizada **\n"))
          
          rl.question(("Coloque el numero de la tarea completada\n >"),(input) =>{
            task.complete(input) 
            console.info('presione "Enter" para continuar')
            rl.on('line', () => {
            reCall()
            }); 
          })
        break
        case(4):
        console.clear()
        console.log(("    ** Seleccione la tarea a eliminar **\n"))
        rl.question(("Coloque el numero de la tarea que desea eliminar\n >"),(input) =>{
          task.delete(input)          
          console.info('presione "Enter" para continuar')
          rl.on('line', () => {
          reCall()
        }); 
        })
      break
        default:
          console.log(('opcion invalida,pulse "enter" para volver a intentarlo\n'))
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

