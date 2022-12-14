const{response, request} = require("express")
const pool = require("../db/connection")

const modelsCliente = require("../models/cliente")
const {queryClienteExists} = require("../models/cliente")

const addClien = async (req = request, res = response) => {
    const {Nombre_Cliente,
          Apellidos_Cliente,
          Edad, 
          Genero,
          Ciudad_Cliente,
          Calle_Cliente,
          Num_Telefonico,
          Activo } = req.body//URI params

    if(!Nombre_Cliente || !Apellidos_Cliente || !Edad || !Genero || !Ciudad_Cliente || !Calle_Cliente || !Num_Telefonico || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [ClienExist] = await conn.query(modelsCliente.queryClienteExists,[Nombre_Cliente])
        
        if(ClienExist){
            res.status(400).json({msg: `El Cliente '${Nombre_Cliente}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelsCliente.queryAddClien,
                            [
                            Nombre_Cliente,
                            Apellidos_Cliente,
                            Edad, 
                            Genero, 
                            Ciudad_Cliente,
                            Calle_Cliente,
                            Num_Telefonico, 
                            Activo 
                            ], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo reagistrar el cliente con Nombre ${Nombre_Cliente}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el cliente con Nombre ${Nombre_Cliente}`})//Se manda la lista de equipos
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updateCliente = async (req = request, res = response) => {
    //const {id} = req.params
    const {Nombre_Cliente,
        Apellidos_Cliente,
        Edad,
        Genero,
        Ciudad_Cliente, 
        Calle_Cliente, 
        Num_Telefonico, 
        Activo } = req.body//URI params

        if(!Nombre_Cliente || !Apellidos_Cliente || !Edad || !Genero || !Ciudad_Cliente || !Calle_Cliente || !Num_Telefonico || !Activo){
            res.status(400).json({msg: "Faltan Datos"})
            return
        }
    
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [ClienExist] = await conn.query(modelsCliente.queryClienteExists,[Nombre_Cliente])
        
        if(!ClienExist){
            res.status(400).json({msg: `El Cliente '${Nombre_Cliente}' no existe`})
            return
        }
                    const result = await conn.query(`UPDATE Cliente SET 
                    Nombre_Cliente = '${Nombre_Cliente}',
                    Apellidos_Cliente = '${Apellidos_Cliente}',
                    Edad = '${Edad}',
                    Genero = '${Genero}',
                    Ciudad_Cliente = '${Ciudad_Cliente}',
                    Calle_Cliente = '${Calle_Cliente}',
                    Num_Telefonico = '${Num_Telefonico}',
                    Activo = '${Activo}'
                    WHERE Nombre_Cliente = '${Nombre_Cliente}'`, (error) => {if (error) throw error})
                    
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                        res.status(404).json({msg: `No se pudo actualizar el cliente`})
                        return
                        }
   
                    res.json({msg:`Se actualizo satisfactoriamente el cliente '${Nombre_Cliente}'`})//Se manda la lista de equipos
                 
               
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const getCliente = async (req = request, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelsCliente.queryGetCliente, (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen estos clientes registrados"})
            return
        }
        res.json({users})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getClienteByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelsCliente.queryGetClienteByID, [id], (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existe el cliente registrado con el ID ${id}`})
            return
        }
        res.json({user})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const deleteClienteByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelsCliente.queryDeleteClienteByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen clientes registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el cliente con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

module.exports = {addClien, updateCliente, getCliente, getClienteByID, deleteClienteByID}
