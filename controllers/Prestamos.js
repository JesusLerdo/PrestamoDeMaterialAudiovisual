const{response, request} = require("express")
const pool = require("../db/connection")

const modelsPrestamos = require("../models/prestamos")
const {queryPrestamosExists} = require("../models/prestamos")

const addPrest = async (req = request, res = response) => {
    const {Tipo_De_Material_Audiovisual,
          MARCA,
          Numero_Prestamo, 
          F_Solicitud, 
          F_Entrega, 
          Importe_Pagar,
          Activo } = req.body//URI params

    if(!Tipo_De_Material_Audiovisual || !MARCA || !Numero_Prestamo || !F_Solicitud || !F_Entrega || !Importe_Pagar || !Activo){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [PrestExist] = await conn.query(modelsPrestamos.queryPrestamosExists,[Tipo_De_Material_Audiovisual])
        
        if(PrestExist){
            res.status(400).json({msg: `El Material_Audiovisual '${Tipo_De_Material_Audiovisual}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelsPrestamos.queryAddPrest,
                            [
                            Tipo_De_Material_Audiovisual,
                            MARCA,
                            Numero_Prestamo, 
                            F_Solicitud, 
                            F_Entrega, 
                            Importe_Pagar,
                            Activo 
                            ], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo reagistrar el Material Audivisual con Nombre ${Tipo_De_Material_Audiovisual}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el prestamo con Nombre ${Tipo_De_Material_Audiovisual}`})//Se manda la lista de equipos
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updatePrestamos = async (req = request, res = response) => {
    //const {id} = req.params
    const {Tipo_De_Material_Audiovisual,
        MARCA,
        Numero_Prestamo, 
        F_Solicitud, 
        F_Entrega, 
        Importe_Pagar,
        Activo } = req.body//URI params

        if(!Tipo_De_Material_Audiovisual || !MARCA || !Numero_Prestamo || !F_Solicitud || !F_Entrega || !Importe_Pagar || !Activo){
            res.status(400).json({msg: "Faltan Datos"})
            return
        }
    
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [PrestExist] = await conn.query(modelsPrestamos.queryPrestamosExists,[Tipo_De_Material_Audiovisual])
        
        if(!PrestExist){
            res.status(400).json({msg: `El Material_Audiovisual '${Nombre}' no existe`})
            return
        }
                    const result = await conn.query(`UPDATE Prestamos SET 
                    Tipo_De_Material_Audiovisual = '${Tipo_De_Material_Audiovisual}',
                    MARCA = '${MARCA}',
                    Numero_Prestamo = '${Numero_Prestamo}',
                    F_Solicitud = '${F_Solicitud}',
                    F_Entrega = '${F_Entrega}',
                    Importe_Pagar = '${Importe_Pagar}',
                    Activo = '${Activo}'
                    WHERE Tipo_De_Material_Audiovisual = '${Tipo_De_Material_Audiovisual}'`, (error) => {if (error) throw error})
                    
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                        res.status(404).json({msg: `No se pudo actualizar el Prestamo`})
                        return
                        }
   
                    res.json({msg:`Se actualizo satisfactoriamente el prestamo '${Tipo_De_Material_Audiovisual}'`})//Se manda la lista de equipos
                 
               
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const getPrestamos = async (req = request, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelsPrestamos.queryGetPrestamos, (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen prestamos registradas"})
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

const getPrestamosByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelsPrestamos.queryGetPrestamosByID, [id], (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existe el prestamo registrado con el ID ${id}`})
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

const deletePrestamosByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelsPrestamos.queryDeletePrestamosByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen prestamos registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el prestamo con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

module.exports = {addPrest, updatePrestamos, getPrestamos, getPrestamosByID, deletePrestamosByID}
