require('colors');
const { 
    guardarDB, 
    leerDB 
    } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa, 
    leerinput,
    listadoTareasBorrada,
    confirmar,
    mostrarTareas,
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () =>{
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //inquirerMenu nos permite Imprimir menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerinput('Descripción: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listaTareaCompletada(true);
            break;
            case '4':
                tareas.listaTareaCompletada(false);
            break;
            case '5':
                const ids = await mostrarTareas(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrada(tareas.listadoArr);
                if( id !=='0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                }
                }
                
            break;
        }
        
        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');
    
}

main()