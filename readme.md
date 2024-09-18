# Todo App

Esta es una aplicación Para el manejo de tareas a traves del CLI(Commad-line-interface)

***
## Como utilizar:

### Anadir Tarea: Task-Cli add \[string]:
Este comando se utiliza para crear una nueva tarea, en **[string]** se colocara la descripción de la tarea, y esta devolverá un id el cual se podrá utilizar para manejar dicha tarea
### Mostrar todas las tareas: Task-Cli list \[status]:
El comando list mostrada todas las tareas creadas por el usuario, también puede tener un valor opcional **[status]**, el cual mostrara las tareas que estén en ese estado, las opciones son
- **todo**: hace referencia a todas las tareas incompletas y no han sido iniciadas (estado inicial de todas las tareas)
- **in-progress**: En este estado las tareas están en proceso de ser completadas
- **done**: Estado de las tareas completadas

La informacion mostrara de la tarea sera:
el Id,la descripcion,el estado, la Fecha creacion y la fecha de la ultima actualizacion, este ultimo no se mostrara si no se ha actualizado anteriormente

### Cambiar el estado de una tarea:Task-Cli mark [Id] [estado] 
Este comando servida para cambiar el estado de una tarea, en el **[id]** se colocara el id del la tarea a cambiar, y en **[estado]** se colocara **1** para cambiar el estado a **in-progress** y **0** para cambiar el estado a **done**

### Actualizar una tarea: Task-Cli update [id] [decripción]
Este comado se utilizada para cambiar la decripción de una tarea en especifico,**[id]** se colocara el id del la tarea a cambiar, y en **[estado]** se colocara la nueva descripcion del archivo
### Eliminar una tarea: Task-Cli delete [id]
Este comado se utilizada para eliminar a una tarea especifica,donde se colocara el [id] de la tarea

***
## Autor
Este proyecto fue hecho es su totalidad por 
**Luis Marval, Correo:<Luismarval5a@gotmail.com>**