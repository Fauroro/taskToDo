const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getTask = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/tareas`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
            return(datos);
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
		} else if(respuesta.status === 404){
            console.log('no existe la tarea');
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
		} 
	} catch(error){ 
        console.log(error);
	}
    
}
const postTask = (datos) =>{

    fetch(`${URL_API}/tareas`,
	{
		method: "POST",
		headers: myHeaders,
		body:JSON.stringify(datos)
	}
    ).then(res=>{
        return res.json()
    }).then(res=>{
        //idUser=res.id;
    }).catch(err=>{
        console.log(err);
    })

}
const putTask = (datos,id) =>{

    fetch(`${URL_API}/tareas/${id}`,
	{
		method: "PUT",
		headers: myHeaders,
		body:JSON.stringify(datos)
	}
    ).then(res=>{
        return res.json()
    }).then(res=>{
        //idUser=res.id;
    }).catch(err=>{
        console.log(err);
    })

}
export {
    getTask as getTasks,
    postTask as postTasks,
    putTask as putTasks
};